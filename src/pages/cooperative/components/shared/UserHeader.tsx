import { Author } from '../../../../types/posts';

interface UserHeaderProps {
  author: Author;
  createdAt: string;
}
function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const created = new Date(dateString);

  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngày trước`;
}
export default function UserHeader({ author, createdAt }: UserHeaderProps) {
  return (
    <div className="flex gap-3 items-center">
      <img
        src={author.avatar}
        alt={author.name}
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="font-semibold">{author.name}</p>
        <p className="text-xs text-gray-500">{formatTimeAgo(createdAt)}</p>
      </div>
    </div>
  );
}
