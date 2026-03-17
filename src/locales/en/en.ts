import { Signal } from 'lucide-react';

export const en = {
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

    ACTIONS: {
      TITLE: 'Quick Actions',
      SUBTITLE: 'Frequently used features',
      CREATE_ORDER: 'Create Purchase Order',
      MANAGE_MEMBERS: 'Manage Members',
      PRODUCTION_STATS: 'Production Statistics',
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
    REPLY: 'Reply',
    SEND: 'Send',
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
    PUBLISH: 'Publish',
    PUBLISHED: 'Published',

    WRITE_COMMENT: 'Write a comment...',
    TIME: {
      JUST_NOW: 'Just now',

      MINUTES_one: '{{count}} minute ago',
      MINUTES_other: '{{count}} minutes ago',

      HOURS_one: '{{count}} hour ago',
      HOURS_other: '{{count}} hours ago',

      DAYS_one: '{{count}} day ago',
      DAYS_other: '{{count}} days ago',
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

    FILTER: {
      ALL: 'All',
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

    EMPTY: 'No members available',

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
  CONTRACT: {
    LOAD_ERROR: 'Unable to load contract',
    TITLE: 'Contract Sales',
    SUBTITLE: 'List of contract sales with cooperatives',
    CREATE: 'Create New Contract',
    LOADING: 'Loading contract...',
    EMPTY: 'No contracts available',

    ENTERPRISE: 'Enterprise',
    COOPERATIVE: 'Cooperative',
    QUANTITY: 'Quantity',
    PRICE: 'Price',
    TOTAL_VALUE: 'Total Value',
    DELIVERY_DATE: 'Delivery Date',
    VIEW_DOCUMENT: 'View Contract Document',
    TOAST: {
      CREATE_SUCCESS: 'Contract created successfully',
      CREATE_ERROR: 'Unable to create contract. Please try again',
    },
  },
  CHAT: {
    LOAD_ERROR: 'Unable to load chat list',
    DRAFT_ERROR: 'Unable to create contract draft. Please try again',
    TITLE: 'Messages',
    SUBTITLE: 'Communication between cooperative and enterprise',
    SELECT_ROOM: 'Select a conversation to start',
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
    TYPE_MESSAGE: 'Type a message...',
    LOAD_SUCCESS: 'Loaded chat list successfully!',
    FETCH_MESSAGES_ERROR: 'Failed to load messages!',
    ROOM_LOADED: 'Chat room loaded!',
    SENDING: 'Sending message...',
    SEND_SUCCESS: 'Message sent successfully!',
    SEND_ERROR: 'Failed to send message!',
    DRAFT_SUCCESS: 'Contract drafted successfully!',
    SENDING_CONTRACT: 'Sending contract...',
    SEND_CONTRACT_SUCCESS: 'Contract sent successfully!',
    SEND_CONTRACT_ERROR: 'Failed to send contract!',
    CONTRACT_SAVED: 'Contract saved successfully!',
    NO_ROOM_SELECTED: 'No chat room selected!',
    CONTRACT_NOT_FOUND: 'Contract not found for this chat room!',
    CONTRACT_NO_PERMISSION: 'You do not have permission to send this contract!',
    CONTRACT_EMPTY: 'Contract data is empty!',
    TITLE_CONTRACT: 'CONTRACT',
    COOP: 'Cooperative',
    ENTERPRISE: 'Enterprise',
    VIEW_DETAILS: 'View Details',
    SIGN_BUTTON: 'Sign Contract',
    STATUS: {
      PENDING_ENTERPRISE: 'Pending Enterprise',
      PENDING_COOP: 'Pending Cooperative',
      SIGNED: 'Signed',
      CANCELLED: 'Cancelled',
    },
  },
  HEADER: {
    HOME: 'Home page',
    ABOUT: 'About',
    SERVICES: 'Services',
    NEWS: 'News',
    CONTACT: 'Contact',
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
};
