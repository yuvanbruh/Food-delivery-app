import React from 'react';
import Link from 'next/link';
const UserTabs = ({ activeTab, isAdmin }) => {
  return (
    <div>
      <div className="flex gap-4 mb-6">
        <Link
          href="/profile"
          className={`text-blue-600 font-semibold hover:text-blue-700 ${
            activeTab === 'profile' ? 'text-blue-700' : 'text-gray-500'
          }`}
        >
          Profile
        </Link>
        <Link
          href="/categories"
          className={`text-blue-600 font-semibold hover:text-blue-700 ${
            activeTab === 'categories' ? 'text-blue-700' : 'text-gray-500'
          }`}
        >
          Categories
        </Link>
        <Link
          href="/menuItems"
          className={`text-blue-600 font-semibold hover:text-blue-700 ${
            activeTab === 'menu-items' ? 'text-blue-700' : 'text-gray-500'
          }`}
        >
          Menu Items
        </Link>
        <Link
          href="/users"
          className={`text-blue-600 font-bold hover:text-blue-700 ${
            activeTab === 'users' ? 'text-blue-700' : 'text-gray-500'
          }`}
        >
          Users
        </Link>
        <Link
          href="/orders"
          className={`text-blue-600 font-semibold hover:text-blue-700 ${
            activeTab === 'orders' ? 'text-blue-700' : 'text-gray-500'
          }`}
        >
          Orders
        </Link>
      </div>
    </div>
  );
};

export default UserTabs;
