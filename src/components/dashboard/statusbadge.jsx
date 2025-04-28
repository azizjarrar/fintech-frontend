import React from 'react';

const Statusbadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch ("assigned_to_lender") {
      case 'submitted':
        return { color: 'text-gray-600', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' };
      case 'assigned_to_lender':
        return { color: 'text-blue-600', bgColor: 'bg-blue-100', borderColor: 'border-blue-300' };
      case 'lender_approved':
        return { color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-300' };
      case 'lender_disapproved':
        return { color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-300' };
      case 'invoice_uploaded':
        return { color: 'text-orange-600', bgColor: 'bg-orange-100', borderColor: 'border-orange-300' };
      case 'buyer_approved':
        return { color: 'text-green-600', bgColor: 'bg-green-100', borderColor: 'border-green-300' };
      case 'buyer_disapproved':
        return { color: 'text-red-600', bgColor: 'bg-red-100', borderColor: 'border-red-300' };
      case 'invoice_funded':
        return { color: 'text-purple-600', bgColor: 'bg-purple-100', borderColor: 'border-purple-300' };
      case 'closed':
        return { color: 'text-gray-600', bgColor: 'bg-gray-100', borderColor: 'border-gray-300' };
      default:
        return { color: 'text-black', bgColor: 'bg-white', borderColor: 'border-gray-300' };
    }
  };

  const { color, bgColor, borderColor } = getStatusStyles(status);

  return (
    <div
      className={`px-2 py-2 rounded-full border !text-xs ${bgColor} ${color} ${borderColor}`}
    >
      {status?.replace(/_/g, ' ')}
    </div>
  );
};

export default Statusbadge;
