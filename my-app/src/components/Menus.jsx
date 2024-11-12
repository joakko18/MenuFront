import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/appcontext'; // Make sure the path is correct
import './Menus.css';
import DeleteItemButton from './DeleteItem';
import UpdateItemForm from './UpdateItem';

const DisplayMenusWithDetails = () => {
  const { menus, refreshMenus } = useContext(AppContext);
  const [localMenus, setLocalMenus] = useState(menus);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    setLocalMenus(menus);
  }, [menus]);

  const handleItemDeleted = (itemId) => {
    setLocalMenus((prevMenus) =>
      prevMenus.map((menu) => ({
        ...menu,
        categories: menu.categories.map((category) => ({
          ...category,
          items: category.items.filter((item) => item.item_id !== itemId),
        })),
      }))
    );
    // Optionally refresh data from server
    refreshMenus();
  };

  const handleItemUpdated = (updatedItem) => {
    setLocalMenus((prevMenus) =>
      prevMenus.map((menu) => ({
        ...menu,
        categories: menu.categories.map((category) => ({
          ...category,
          items: category.items.map((item) =>
            item.item_id === updatedItem.item_id ? updatedItem : item
          ),
        })),
      }))
    );
    setEditingItemId(null);
    // Optionally refresh data from server
    refreshMenus();
  };

  const startEditingItem = (item) => {
    setEditingItemId(item.item_id);
  };

  const cancelEditing = () => {
    setEditingItemId(null);
  };

  return (
    <div className="menus-list">
      <h2>Your Menus</h2>
      {localMenus.length === 0 ? (
        <p>No menus available.</p>
      ) : (
        localMenus.map((menu) => (
          <div key={menu.menu_id} className="menu-item">
            <h3>{menu.name}</h3>
            <p><strong>ID:</strong> {menu.menu_id}</p>
            <p>{menu.description}</p>
            {menu.categories.length === 0 ? (
              <p>No categories available.</p>
            ) : (
              menu.categories.map((category) => (
                <div key={category.category_id} className="category-item">
                  <h4>Category: {category.name}   </h4><h4>CategoryID:{category.category_id}</h4>
                  {category.items.length === 0 ? (
                    <p>No items available.</p>
                  ) : (
                    category.items.map((item) => (
                      <div key={item.item_id} className="item">
                        {editingItemId === item.item_id ? (
                          <UpdateItemForm
                            itemId={item.item_id}
                            initialName={item.name}
                            initialDescription={item.description}
                            onItemUpdated={handleItemUpdated}
                            onCancel={cancelEditing}
                          />
                        ) : (
                          <>
                            <p><strong>ID:</strong> {item.item_id}</p>
                            <p><strong>Item:</strong> {item.name}</p>
                            <p><strong>Price:</strong> {item.price}</p>
                            <p>{item.description}</p>
                            <button onClick={() => startEditingItem(item)}>Update Item</button>
                            <DeleteItemButton itemId={item.item_id} onItemDeleted={handleItemDeleted} />
                          </>
                        )}
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayMenusWithDetails;
