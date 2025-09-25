// import React, { useState } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { Badge } from '../ui/badge';
// import { Package, Plus, Search } from 'lucide-react';

// export function InventoryManagement() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [items] = useState([
//     { id: 1, name: 'Surgical Gloves', quantity: 500, category: 'PPE', status: 'in-stock' },
//     { id: 2, name: 'Face Masks', quantity: 50, category: 'PPE', status: 'low-stock' },
//     { id: 3, name: 'Syringes', quantity: 0, category: 'Medical Equipment', status: 'out-of-stock' },
//   ]);

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'in-stock': return 'bg-green-100 text-green-800';
//       case 'low-stock': return 'bg-yellow-100 text-yellow-800';
//       case 'out-of-stock': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
//           <p className="text-gray-600">Manage hospital supplies and equipment</p>
//         </div>
//         <Button>
//           <Plus className="h-4 w-4 mr-2" />
//           Add Item
//         </Button>
//       </div>

//       <Card>
//         <CardContent className="p-6">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               placeholder="Search inventory..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Inventory Items</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {items.map((item) => (
//               <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//                       <Package className="h-6 w-6 text-purple-600" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-gray-900">{item.name}</h3>
//                       <p className="text-gray-600">{item.category} • Qty: {item.quantity}</p>
//                       <Badge className={getStatusColor(item.status)}>
//                         {item.status.replace('-', ' ')}
//                       </Badge>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Manage Stock
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Package, Plus, Search, X } from 'lucide-react';

export function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    status: 'in-stock',
    notes: ''
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5001/api/inventory');
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/inventory', newItem);
      setItems((prev) => [...prev, res.data]);
      setIsModalOpen(false);
      setNewItem({ name: '', category: '', quantity: 0, status: 'in-stock', notes: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage hospital supplies and equipment</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : filteredItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No items found</p>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">{item.category} • Qty: {item.quantity}</p>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage Stock
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Inventory Item</h2>
              <X className="cursor-pointer" onClick={() => setIsModalOpen(false)} />
            </div>
            <div className="space-y-3">
              <Input
                placeholder="Name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <Input
                placeholder="Category"
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
              <select
                className="w-full border rounded p-2"
                value={newItem.status}
                onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
              >
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <Input
                placeholder="Notes"
                value={newItem.notes}
                onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
              />
              <Button onClick={handleAddItem} className="w-full mt-2">
                Save Item
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
