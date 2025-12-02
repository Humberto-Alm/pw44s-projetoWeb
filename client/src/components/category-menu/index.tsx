import React, { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import { Sidebar } from "primereact/sidebar";
import CategoryService from "@/services/category-service";
import type { ICategory } from "@/commons/types"; 
import type { MenuItem } from "primereact/menuitem"; 

interface CategoryMenuProps {
  onSelectCategory: (categoryId?: number) => void;
  visible: boolean;
  onHide: () => void;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  onSelectCategory,
  visible,
  onHide,
}) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); 

  useEffect(() => {
    const loadCategories = async () => {
      const response = await CategoryService.findAll();
      if (response.success && Array.isArray(response.data)) {
        const items: MenuItem[] = response.data.map(
          (category: ICategory) => ({
            label: category.name,
            command: () => onSelectCategory(category.id),
          })
        );
        
        setMenuItems([
          { 
            label: "All Products", 
            command: () => onSelectCategory(undefined) 
          }, 
          ...items,
        ]);
      }
    };
    loadCategories();
  }, []);

  return (
    <Sidebar visible={visible} onHide={onHide} fullScreen> 
      <h2 className="text-xl mb-4">Product Categories</h2> 
      <Menu model={menuItems} className="w-full md:w-15rem" /> 
    </Sidebar>
  );
};