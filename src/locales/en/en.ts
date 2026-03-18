export const en = {
  COMMON: {
    CURRENCY: 'VND',
    UNIT: {
      KG: 'kg',
      TON: 'ton',
    },
    AND: 'and',
    PER: '/',
    LOADING: 'Loading...',
    EMPTY: 'No data available',
    ERROR: 'An error occurred',
  },
  DASHBOARD: {
    HOME_TITLE: 'Cooperative Dashboard',
    HOME_SUBTITLE: 'Welcome to the cooperative management system',

    STATUS: {
      TOTAL_MEMBERS: 'Total Members',
      TOTAL_PACKAGES: 'Bulk Packages',
      COLLECTING: 'Collecting',
      CONTRACT_SALES: 'Contract Sales',
      MONTH_COMPARE: '+12% compared to last month',
    },

    TRANSACTIONS: {
      TITLE: 'Bulk Purchase Orders',
      SUBTITLE: 'Transaction List',
      VIEW_ALL: 'View All',
      PROCESSING: 'Processing',
    },

    MESSAGES: {
      TITLE: 'New Messages',
    },

    QUICK_ACTIONS: {
      TITLE: 'Quick Actions',
      SUBTITLE: 'Easy to access with quick actions',
      CREATE_PURCHASE_REQUEST: 'Create Purchase Request',
      SEARCH_SUPPLY: 'Search Supply',
      CREATE_ORDER: 'Create Purchase Order',
      MANAGE_MEMBERS: 'Manage Members',
      PRODUCTION_STATS: 'Production Statistics',
    },

    ACTIVITIES: {
      TITLE: 'Recent Activities',
      CONTRACT_CONFIRMED: 'Contract {{contractId}} has been confirmed',
      NEW_MESSAGE: 'New message from {{cooperative}} Cooperative',
      DELIVERY_SUCCESS: 'Delivery successful',
      TIME: {
        JUST_NOW: 'Just now',
        MINUTES_AGO: '{{count}} minute ago',
        MINUTES_AGO_other: '{{count}} minutes ago',
        HOURS_AGO: '{{count}} hour ago',
        HOURS_AGO_other: '{{count}} hours ago',
        DAYS_AGO: '{{count}} day ago',
        DAYS_AGO_other: '{{count}} days ago',
      },
    },

    METRICS: {
      TOTAL_POSTS: 'Total Posts',
      ACTIVE_COOPERATIVES: 'Active Cooperatives',
      AVAILABLE_TONS: 'Available Tons',
      MONTHLY_REVENUE: 'Monthly Revenue',
      INCREASE: '+{{value}}',
      DECREASE: '-{{value}}',
      NUMBER: '{{count}}',
      CURRENCY: '{{value}}',
    },
  },

  FEED: {
    TITLE: 'Cooperative Feed',
    SUBTITLE: 'Updates on announcements and collection campaigns',
    MARKETPLACE: 'Marketplace',
    THINKING: 'What are you thinking?',
    LOADING: 'Loading feed...',
    EMPTY_POST: 'No posts available',
    POST_SUCCESS: 'Post created successfully',
    ERROR_LOAD: 'Unable to load feed. Please try again',
    QUICK_STATS: '📊 Quick Statistics',
    TOTAL_POSTS: 'Total Posts',
    CAMPAIGNS: 'Campaigns',
    ANNOUNCEMENTS: 'Announcements',
    UPCOMING_CAMPAIGN: 'Upcoming Campaigns',
    NO_CAMPAIGN: 'No campaigns available',
    NEW: 'New',
    EXPECTED_CAMPAIGN: 'Upcoming Campaign:',
    PUBLISH: 'Publish',
    PUBLISHED: 'Published',
    WRITE_COMMENT: 'Write a comment...',
    SEND: 'Send',
    REPLY: 'Reply',
    ERROR_IMAGE: 'Unable to upload image. Please try again',
    UPLOADING: 'Uploading...',
    POST: 'Post',
    CONTENT_PLACEHOLDER: 'Enter post content...',
    TITLE_POST: 'Title',
    TITLE_POST_PLACEHOLDER: 'Enter post title...',
    ANNOUNCEMENT: 'Announcement',
    CAMPAIGN: 'Campaign',
    PRODUCT: 'Product',
    EXPECTED_DATE: 'Expected Date',
    ATTACHMENTS: 'Attachments',
    ADD_IMAGE: 'Add Image',

    TIME: {
      JUST_NOW: 'Just now',
      MINUTES_AGO: '{{count}} minute ago',
      MINUTES_AGO_other: '{{count}} minutes ago',
      HOURS_AGO: '{{count}} hour ago',
      HOURS_AGO_other: '{{count}} hours ago',
      DAYS_AGO: '{{count}} day ago',
      DAYS_AGO_other: '{{count}} days ago',
    },

    FILTER: {
      ALL: 'All',
      ANNOUNCEMENT: 'Announcement',
      CAMPAIGN: 'Campaign',
    },
  },

  MEMBERS: {
    TITLE: 'Member Management',
    SUBTITLE: 'List of farmers participating in the cooperative',
    SEARCH_PLACEHOLDER: 'Search members',
    EMPTY: 'No members available',

    FILTER: {
      ALL: 'All',
      ACTIVE: 'Active',
      PENDING: 'Pending',
      APPROVED: 'Approved',
      REJECTED: 'Rejected',
    },

    TABLE: {
      NAME: 'Name',
      PHONE: 'Phone Number',
      LOCATION: 'Address',
      STATUS: 'Status',
      ACTION: 'Action',
    },

    STATUS: {
      TOTAL: 'Total',
      ACTIVE: 'Active',
      PENDING: 'Pending',
      APPROVED: 'Approved',
      REJECTED: 'Rejected',
    },

    ACTION: {
      ADD: 'Add Member',
      APPROVE: 'Approve',
      REJECT: 'Reject',
      VIEW: 'View',
    },

    TOAST: {
      APPROVE_SUCCESS: 'Member approved successfully',
      REJECT_SUCCESS: 'Member rejected',
      LOAD_ERROR: 'Unable to load member list',
    },
  },

  MARKETPLACE: {
    TITLE: 'Marketplace',
    SUBTITLE: 'List of collected agricultural products from cooperatives',
    SEARCH_PLACEHOLDER: 'Search products',
    NO_IMAGE: 'No image available',
    COOPERATIVE: 'Cooperative',
    QUANTITY: 'Quantity',
    DESCRIPTION: 'Description',
    CONTACT_FOR_PRICE: 'Contact for price',
    VIEW_DETAILS: 'View details',
    POSTED_DATE: 'Posted: {{date}}',
    PRICE_FORMAT: '{{price}} VND/{{unit}}',
    QUANTITY_FORMAT: '{{quantity}} {{unit}}',

    FILTER: {
      ALL: 'All',
      AVAILABLE: 'Available',
      SOLD: 'Sold',
    },

    PRODUCT: {
      NAME: 'Product Name',
      QUANTITY: 'Quantity',
      PRICE: 'Price',
      LOCATION: 'Location',
      DATE: 'Posted Date',
    },

    STATUS: {
      OPEN: 'Open',
      CLOSED: 'Closed',
    },

    ACTION: {
      VIEW: 'View Details',
      NEGOTIATE: 'Negotiate',
    },

    EMPTY: {
      TITLE: 'No products found',
      SUBTITLE: 'Try changing the filters',
    },

    TOAST: {
      LOAD_ERROR: 'Unable to load marketplace',
    },
  },

  CHAT: {
    TITLE: 'Messages',
    SUBTITLE: 'Communication between cooperative and enterprise',
    SELECT_ROOM: 'Select a conversation to start',
    TYPE_MESSAGE: 'Type a message...',
    AI_DRAFTING: '🤖 AI is drafting the contract...',
    CREATE_CONTRACT: 'Create Contract',
    REQUEST_SAMPLE: 'Request Sample',
    SEND_CONTRACT: 'Send Contract',
    CANCEL: 'Cancel',
    SAVE: 'Save Contract',
    TERMS: 'Contract Terms',
    TOTAL_VALUE: 'Total Value',
    CURRENCY: 'VND',
    PRODUCT: 'Product',
    DELIVERY_DATE: 'Delivery Date',
    QUANTITY: 'Quantity',
    PRICE: 'Price',
    CONTRACT: 'Contract',
    MESSAGE: 'Message',
    LOADING: 'Loading chat list...',
    ROOM_LOADED: 'Chat room loaded!',
    SENDING: 'Sending message...',
    NO_ROOM_SELECTED: 'No chat room selected!',
    CONTRACT_NOT_FOUND: 'Contract not found for this chat room!',
    CONTRACT_NO_PERMISSION: 'You do not have permission to send this contract!',
    CONTRACT_EMPTY: 'Contract data is empty!',

    ERROR: {
      FETCH_ROOMS: 'Error loading chat rooms:',
      FETCH_MESSAGES: 'Error loading messages:',
      SEND_MESSAGE: 'Error sending message:',
      CREATE_CONTRACT: 'Error creating contract:',
    },

    TOAST: {
      LOAD_SUCCESS: 'Chat list loaded successfully!',
      LOAD_ERROR: 'Unable to load chat rooms',
      FETCH_MESSAGES_ERROR: 'Failed to load messages!',
      SEND_SUCCESS: 'Message sent successfully!',
      SEND_ERROR: 'Failed to send message!',
      DRAFT_SUCCESS: 'Contract drafted successfully!',
      DRAFT_ERROR: 'Unable to create contract draft. Please try again',
      SEND_CONTRACT_SUCCESS: 'Contract sent successfully!',
      SEND_CONTRACT_ERROR: 'Failed to send contract!',
      CONTRACT_SAVED: 'Contract saved successfully!',
      CONTRACT_SAVE_ERROR: 'Failed to save contract!',
    },
  },

  CONTRACT: {
    TITLE: 'Bulk Purchase Contracts',
    SUBTITLE: 'List of contracts between cooperative and enterprise',
    CREATE: 'Create New Contract',
    LOADING: 'Loading contracts...',
    EMPTY: 'No contracts available',
    LOAD_ERROR: 'Unable to load contract',
    TITLE_CONTRACT: 'CONTRACT',
    ENTERPRISE: 'Enterprise',
    COOPERATIVE: 'Cooperative',
    PRODUCT: 'Product',
    QUANTITY: 'Quantity',
    PRICE: 'Unit Price',
    TOTAL_VALUE: 'Total Value',
    DELIVERY_DATE: 'Delivery Date',
    VIEW_DOCUMENT: 'View Contract Document',
    VIEW_DETAILS: 'View Details',
    SIGN_BUTTON: 'Sign Contract',

    STATUS: {
      PENDING_ENTERPRISE: 'Pending Enterprise',
      PENDING_COOP: 'Pending Cooperative',
      SIGNED: 'Signed',
      CANCELLED: 'Cancelled',
    },

    TOAST: {
      CREATE_SUCCESS: 'Contract created successfully',
      CREATE_ERROR: 'Unable to create contract. Please try again',
    },
  },

  ORDERS: {
    TITLE: 'Contracts',
    SUBTITLE: 'Manage all purchase contracts',
    CREATE: 'Create Contract',
    LOADING: 'Loading contracts...',
    EMPTY: 'No contracts yet',
    ERROR_LOAD: 'Failed to load contracts',
    ENTERPRISE: 'Enterprise',
    COOPERATIVE: 'Cooperative',
    QUANTITY: 'Quantity',
    PRICE: 'Unit Price',
    TOTAL_VALUE: 'Total Value',
    DELIVERY_DATE: 'Delivery Date',
    VIEW_DOCUMENT: 'View Document',

    STATUS: {
      PENDING_ENTERPRISE_SIGNATURE: 'Pending Enterprise Signature',
      PENDING_COOPERATIVE_SIGNATURE: 'Pending Cooperative Signature',
      SIGNED: 'Signed',
      CANCELLED: 'Cancelled',
      DRAFT: 'Draft',
      EXPIRED: 'Expired',
    },
  },

  PRODUCTS: {
    AVAILABLE_TITLE: 'Available Agricultural Products',
    VIEW_ALL: 'View all →',
    DETAILS: 'View details & order →',
    ORIGIN: '• {{origin}}',
    GRADE: 'Grade A: {{a}}%, Grade B: {{b}}%, Grade C: {{c}}%',
    QUANTITY_AVAILABLE: '{{quantity}} tons available',
    PRICE_PER_KG: '{{price}} VND/kg',

    TAGS: {
      VIETGAP: 'VietGAP',
      ORGANIC: 'Organic',
    },
  },

  HEADER: {
    HOME: 'Home',
    ABOUT: 'About',
    SERVICES: 'Services',
    NEWS: 'News',
    CONTACT: 'Contact',
  },

  SIDEBAR: {
    HOME: 'Home',
    SEARCH_SUPPLY: 'Search Supply',
    PURCHASE_REQUESTS: 'Purchase Requests',
    MESSAGES: 'Messages',
    CONTRACTS: 'Contracts',
    PROFILE: 'Profile',
    BUSINESS: 'Business',
    DEFAULT_COMPANY_NAME: 'Business',
    COLLAPSE: 'Collapse',
    EXPAND: 'Expand',
    LOGOUT: 'Logout',
  },

  FILTER: {
    SEARCH_PLACEHOLDER: 'Search cooperative name',
    PRODUCT_TYPE: 'Product Type',
    ALL: 'All',
    CLEAR: 'Clear filters',
    APPLY: 'Apply',
    RESULT_COUNT: '{{count}} result',
    RESULT_COUNT_other: '{{count}} results',
    NO_RESULTS: 'No results found',
  },

  SOURCING: {
    TITLE: 'Source Supply',
    SUBTITLE: 'Discover quality agricultural sources',
    CREATE_BUTTON: 'Create Purchase Request',
    PRICE_NEGOTIABLE: 'Negotiable',

    MY_REQUESTS: {
      TITLE: 'My Purchase Requests',
      SUBTITLE: 'Manage your created purchase requests',
      REQUEST_ID: 'Request ID',
      QUANTITY: 'Quantity',
      EXPECTED_PRICE: 'Expected Price',
      DEADLINE: 'Deadline',
      CREATED_AT: 'Created at',
      UPDATED_AT: 'Updated at',
      COUNT: '{{count}} request',
      COUNT_other: '{{count}} requests',
    },

    STATUS: {
      OPEN: 'Open',
      CLOSED: 'Closed',
      CANCELLED: 'Cancelled',
    },

    UNITS: {
      KG: 'kg',
      TON: 'ton',
    },
    PRODUCTS: {
      FOUND_COUNT: 'Found {{count}} product',
      FOUND_COUNT_other: 'Found {{count}} products',
    },

    SORT: {
      RELEVANT: 'Most Relevant',
      PRICE_ASC: 'Price: Low → High',
      PRICE_DESC: 'Price: High → Low',
      CONTACT_PRICE: 'Contact for Price',
    },
    EMPTY: {
      TITLE: 'No purchase requests yet',
      SUBTITLE: 'Create your first purchase request to start sourcing',
    },

    MODAL: {
      TITLE: 'Create New Purchase Request',
      SUBTITLE: 'Fill in detailed information about your request',
    },

    FORM: {
      PRODUCT_NAME: 'Product Name',
      PRODUCT_NAME_PLACEHOLDER: 'E.g., Arabica Coffee',
      QUANTITY: 'Quantity',
      QUANTITY_PLACEHOLDER: '1000',
      UNIT: 'Unit',
      UNITS: {
        KG: 'Kg',
        TON: 'Ton',
      },
      EXPECTED_PRICE: 'Expected Price (VND)',
      EXPECTED_PRICE_PLACEHOLDER: '50000',
      DEADLINE: 'Deadline',
      REQUIREMENTS: 'Additional Requirements',
      REQUIREMENTS_PLACEHOLDER:
        'Enter specific requirements about quality, specifications, delivery time...',
      CANCEL: 'Cancel',
      CREATE: 'Create Request',
      CREATING: 'Creating...',

      VALIDATION: {
        PRODUCT_NAME_REQUIRED: 'Please enter product name',
        QUANTITY_REQUIRED: 'Please enter quantity',
        DEADLINE_REQUIRED: 'Please select deadline',
        DEADLINE_PAST: 'Deadline cannot be in the past',
      },
    },

    TOAST: {
      CREATE_SUCCESS: 'Purchase request created successfully!',
      CREATE_FAILED: 'Failed to create purchase request',
      FETCH_ERROR: 'Error loading purchase requests',
      ACCESS_ERROR: 'Unable to access user information. Please login again.',
      UNAUTHORIZED: 'Session expired. Please login again.',
      FORBIDDEN:
        'You do not have permission to create purchase requests. Please contact admin.',
      INVALID_DATA: 'Invalid data',
      SERVER_ERROR: 'Server error. Please try again later.',
      NOT_FOUND: 'API endpoint not found',
    },

    ERROR: {
      FETCH_REQUESTS: 'Error loading purchase requests:',
      FETCH_PRODUCTS: 'Error loading products:',
    },
  },
};
