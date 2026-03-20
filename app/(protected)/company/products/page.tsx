'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import React from 'react';

import MainLayout from '@/src/components/layout/MainLayout';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import InputField from '@/src/components/common/InputField';
import httpClient from '@/src/services/http/httpClient';
import { fileService } from '@/src/services/fileService';
import { Product, PriceTier, categoryOptions } from '@/src/types';

// API functions
const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('Fetching enterprise products...');
    const response = await httpClient.get('/api/v1/products/enterprise/me', {
      params: {
        page: 0,
        size: 50,
        sort: ['name,asc'],
      },
    });
    console.log('Products response:', response.data);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const createProduct = async (productData: {
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  description: string;
  imageUrl: string;
  attributes: Record<string, unknown>;
  priceTiers: { minQty: number; price: number }[];
}): Promise<Product | null> => {
  try {
    console.log('Creating product with data:', productData);
    const response = await httpClient.post('/api/v1/products', productData);
    console.log('Product created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

const updateProduct = async (
  id: string,
  productData: Partial<Product>
): Promise<Product | null> => {
  try {
    console.log('Update product not implemented in backend');
    toast.error('Chức năng cập nhật sản phẩm đang phát triển');
    return null;
  } catch (error: unknown) {
    console.error('Error updating product:', error);
    return null;
  }
};

const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    console.log('Delete product not implemented in backend');
    toast.error('Chức năng xóa sản phẩm đang phát triển');
    return false;
  } catch (error: unknown) {
    console.error('Error deleting product:', error);
    return false;
  }
};

/* ================= CREATE/EDIT PRODUCT DIALOG ================= */
function ProductDialog({
  open,
  onOpenChange,
  product,
  onProductSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onProductSaved: () => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'FERTILIZER' as
      | 'FERTILIZER'
      | 'SEED'
      | 'PESTICIDE'
      | 'MACHINERY'
      | 'OTHER',
    unit: '',
    basePrice: '',
    description: '',
    imageUrls: [] as string[],
    imageFile: null as File | null,
    priceTiers: [{ minQty: '', price: '' }] as PriceTier[],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        unit: product.unit,
        basePrice: product.basePrice.toString(),
        description: product.description,
        imageUrls:
          product.imageUrls || (product.imageUrl ? [product.imageUrl] : []),
        imageFile: null,
        priceTiers: product.priceTiers.map((tier) => ({
          minQty: tier.minQty.toString(),
          price: tier.price.toString(),
        })) || [{ minQty: '', price: '' }],
      });
    } else {
      setFormData({
        name: '',
        category: 'FERTILIZER' as
          | 'FERTILIZER'
          | 'SEED'
          | 'PESTICIDE'
          | 'MACHINERY'
          | 'OTHER',
        unit: '',
        basePrice: '',
        description: '',
        imageUrls: [],
        imageFile: null,
        priceTiers: [{ minQty: '', price: '' }],
      });
    }
  }, [product, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`File ${file.name} không được vượt quá 5MB`);
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error(`File ${file.name} không phải là hình ảnh`);
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imageUrls: [previewUrl],
    }));
  };

  const removeImage = () => {
    // Revoke object URL to avoid memory leaks
    if (formData.imageUrls.length > 0) {
      const url = formData.imageUrls[0];
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    }

    setFormData((prev) => ({
      ...prev,
      imageUrls: [],
      imageFile: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Parse price tiers
      const priceTiers = formData.priceTiers
        .filter((tier) => tier.minQty && tier.price)
        .map((tier) => ({
          minQty: parseInt(tier.minQty),
          price: parseFloat(tier.price),
        }));

      // Upload new image and get URL
      let uploadedImageUrl = '';

      if (formData.imageFile) {
        toast.loading('Đang tải ảnh lên...');

        try {
          console.log(`Uploading file: ${formData.imageFile.name}`);
          uploadedImageUrl = await fileService.uploadFile(formData.imageFile);
          console.log(`Uploaded successfully: ${uploadedImageUrl}`);
        } catch (error) {
          console.error('Failed to upload image:', error);
          toast.error(`Tải ảnh ${formData.imageFile.name} thất bại`);
        }

        toast.dismiss();
      }

      // Use existing URL (non-blob) or newly uploaded URL
      const existingUrl =
        formData.imageUrls.find((url) => !url.startsWith('blob:')) || '';
      const finalImageUrl = uploadedImageUrl || existingUrl;

      const productData = {
        name: formData.name,
        category: formData.category,
        unit: formData.unit,
        basePrice: parseFloat(formData.basePrice),
        description: formData.description,
        imageUrl: finalImageUrl,
        imageUrls: finalImageUrl ? [finalImageUrl] : [],
        attributes: {}, // Default empty attributes
        priceTiers,
      };

      // Clean up the data before sending
      const cleanProductData = {
        name: productData.name,
        category: productData.category,
        unit: productData.unit,
        basePrice: productData.basePrice,
        description: productData.description,
        imageUrl: productData.imageUrl,
        imageUrls: productData.imageUrls,
        attributes: productData.attributes,
        priceTiers: productData.priceTiers,
      };

      console.log(
        'File to upload:',
        formData.imageFile ? formData.imageFile.name : 'none'
      );
      console.log('Uploaded URL:', uploadedImageUrl);
      console.log('Existing URL:', existingUrl);
      console.log('Final image URL:', finalImageUrl);

      let result;
      if (product) {
        result = await updateProduct(product.id, cleanProductData);
      } else {
        result = await createProduct(cleanProductData);
      }

      if (result) {
        toast.success(
          product ? 'Cập nhật sản phẩm thành công' : 'Tạo sản phẩm thành công'
        );
        onOpenChange(false);
        onProductSaved();
      } else {
        toast.error(
          product ? 'Cập nhật sản phẩm thất bại' : 'Tạo sản phẩm thất bại'
        );
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const addPriceTier = () => {
    setFormData((prev) => ({
      ...prev,
      priceTiers: [...prev.priceTiers, { minQty: '', price: '' }],
    }));
  };

  const removePriceTier = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      priceTiers: prev.priceTiers.filter((_, i) => i !== index),
    }));
  };

  const updatePriceTier = (
    index: number,
    field: 'minQty' | 'price',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      priceTiers: prev.priceTiers.map((tier, i) =>
        i === index ? { ...tier, [field]: value } : tier
      ),
    }));
  };

  return open ? (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {product ? 'Chỉnh sửa sản phẩm' : 'Tạo sản phẩm mới'}
          </h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="w-4 h-4 rotate-45" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Tên sản phẩm"
              placeholder="Ví dụ: Phân bón NPK Cà Mau"
              value={formData.name}
              onChangeValue={(value) =>
                setFormData((prev) => ({ ...prev, name: value }))
              }
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Danh mục
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value as
                      | 'FERTILIZER'
                      | 'SEED'
                      | 'PESTICIDE'
                      | 'MACHINERY'
                      | 'OTHER',
                  }))
                }
                required
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Đơn vị"
              placeholder="Ví dụ: bao 50kg"
              value={formData.unit}
              onChangeValue={(value) =>
                setFormData((prev) => ({ ...prev, unit: value }))
              }
              required
            />

            <InputField
              label="Giá gốc (VNĐ)"
              type="number"
              placeholder="Ví dụ: 500000"
              value={formData.basePrice}
              onChangeValue={(value) =>
                setFormData((prev) => ({ ...prev, basePrice: value }))
              }
              required
            />
          </div>

          <InputField
            label="Mô tả sản phẩm"
            placeholder="Mô tả ngắn gọn về sản phẩm"
            value={formData.description}
            onChangeValue={(value) =>
              setFormData((prev) => ({ ...prev, description: value }))
            }
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Hình ảnh sản phẩm
            </label>
            <div className="space-y-2">
              {formData.imageUrls.length > 0 && (
                <div className="relative">
                  <img
                    src={formData.imageUrls[0]}
                    alt="Product preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
                  <svg
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="mb-2">
                  <label className="cursor-pointer inline-block">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Chọn hình ảnh
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF tối đa 5MB
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Giá sỉ theo số lượng
            </label>
            <p className="text-xs text-gray-500">
              Để trống nếu không có giá sỉ
            </p>

            {formData.priceTiers.map((tier, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Số lượng tối thiểu
                  </label>
                  <InputField
                    placeholder="Ví dụ: 50"
                    value={tier.minQty}
                    onChangeValue={(value) =>
                      updatePriceTier(index, 'minQty', value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">
                    Giá sỉ (VNĐ)
                  </label>
                  <InputField
                    placeholder="Ví dụ: 450000"
                    value={tier.price}
                    onChangeValue={(value) =>
                      updatePriceTier(index, 'price', value)
                    }
                  />
                </div>
                {formData.priceTiers.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removePriceTier(index)}
                    className="mb-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addPriceTier}
              className="w-full hover:bg-green-50 hover:border-green-300 hover:text-green-700"
            >
              + Thêm mức giá sỉ
            </Button>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : product ? 'Cập nhật' : 'Tạo sản phẩm'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

/* ================= DELETE CONFIRM DIALOG ================= */
function DeleteConfirmDialog({
  open,
  onOpenChange,
  productName,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  onConfirm: () => void;
}) {
  return open ? (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Xác nhận xóa</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Plus className="w-4 h-4 rotate-45" />
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Bạn có chắc chắn muốn xóa sản phẩm `{productName}`?
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>

            <Button
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={onConfirm}
            >
              Xóa
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

/* ================= MAIN CONTENT ================= */
function ProductsContent() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    const productList = await fetchProducts();
    // Sort by creation date (newest first) - assuming newer products have higher IDs or are at the end
    const sortedProducts = [...productList].reverse();
    setProducts(sortedProducts);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setEditOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      const success = await deleteProduct(selectedProduct.id);
      if (success) {
        toast.success('Xóa sản phẩm thành công');
        loadProducts();
      } else {
        toast.error('Xóa sản phẩm thất bại');
      }
      setDeleteOpen(false);
      setSelectedProduct(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý sản phẩm</h1>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Tìm kiếm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button
          className="bg-green-600 hover:bg-green-700 gap-2"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Tạo sản phẩm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8 col-span-full">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
            <Button
              className="mt-4 bg-green-600 hover:bg-green-700"
              onClick={() => setCreateOpen(true)}
            >
              Tạo sản phẩm đầu tiên
            </Button>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              {/* IMAGE */}
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Package className="w-6 h-6 text-gray-400" />
                )}
              </div>

              {/* INFO */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base">{product.name}</h3>

                <div className="flex items-center gap-2 mt-1 text-sm">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs">
                    {
                      categoryOptions.find(
                        (opt) => opt.value === product.category
                      )?.label
                    }
                  </span>
                  <span className="text-gray-500">{product.unit}</span>
                </div>

                {/* description / extra */}
                {product.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                    {product.description}
                  </p>
                )}

                {/* price tiers */}
                {product.priceTiers?.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {product.priceTiers
                      .slice(0, 3)
                      .map(
                        (tier) =>
                          `≥${tier.minQty}: ${(tier.price / 1000).toFixed(0)}k`
                      )
                      .join(', ')}
                  </p>
                )}

                {/* CTA */}
                <p className="text-green-600 text-sm mt-1 font-medium cursor-pointer">
                  Xem chi tiết & đặt hàng →
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right flex flex-col items-end gap-2">
                {/* PRICE */}
                <p className="text-lg font-bold text-orange-600 whitespace-nowrap">
                  {(product.basePrice / 1000).toFixed(0)},000 đ/{product.unit}
                </p>

                {/* STOCK (fake nếu chưa có) */}
                <p className="text-xs text-gray-500">Còn hàng</p>

                {/* ACTION */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Sửa
                  </Button>

                  <Button
                    size="sm"
                    className="text-xs bg-red-50 text-red-600 hover:bg-red-100"
                    onClick={() => handleDelete(product)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Xóa
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <ProductDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        product={null}
        onProductSaved={loadProducts}
      />

      <ProductDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        product={selectedProduct}
        onProductSaved={loadProducts}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        productName={selectedProduct?.name || ''}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

/* ================= PAGE ================= */
export default function ProductsPage() {
  return (
    <MainLayout>
      <ProductsContent />
    </MainLayout>
  );
}
