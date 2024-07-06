'use client';
import Link from "next/link";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";

// Components
import FormInput from "@/components/FormInput/FormInput";
import { ProfileSteps } from "@/components/ProcessSteps/ProcessSteps";
import CustomDropdown from "@/components/CustomDropdown/CustomDropdown";

// Utils
import createToast from "@/utils/createToast";

// Actions
import { addCategoryItem } from "@/lib/actions/profile";

const categories = [
  {
    id: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
    name: "Hair",
    subCategories: [
      {
        id: "e507a45d-23ec-44a1-ae12-acf4b4186af1",
        name: "Hair-cut (All types)",
        categoryId: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
        categoryEntries: [],
      },
      {
        id: "98a3fcfa-f243-4509-a26c-2e5da4dba9ef",
        name: "Beard care/Trimming",
        categoryId: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
        categoryEntries: [],
      },
      {
        id: "57dc1be1-1ded-4521-b00f-c2aeb931c1f5",
        name: "Hair wash/conditioning",
        categoryId: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
        categoryEntries: [],
      },
      {
        id: "6fe2053e-49ad-4e12-aeec-95e1157807e5",
        name: "Blow dry",
        categoryId: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
        categoryEntries: [],
      },
      {
        id: "e5868bd8-21f8-498f-9ad3-a9f6f4e318c6",
        name: "All types of hair colors",
        categoryId: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
        categoryEntries: [],
      },
      {
        id: "9d7110b6-3485-46df-91ef-4b5a2d449f4f",
        name: "All types of waxing",
        categoryId: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
        categoryEntries: [],
      },
      {
        id: "400d121f-c9c4-437d-9a9e-d92ff67a5f89",
        name: "All eye brows",
        categoryId: "548a3bab-47dc-45df-abd8-8a80581c6ec9",
        categoryEntries: [],
      },
    ],
  },
  {
    id: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
    name: "Face",
    subCategories: [
      {
        id: "d61c19f8-9a3f-461e-ad1b-1bb694e96bad",
        name: "Clean-up",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
      {
        id: "5b853bc4-0101-4c82-8ab9-9a171afa2967",
        name: "Face pack",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
      {
        id: "676416d7-fb59-4933-869d-46dc60ffdc69",
        name: "Tan",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
      {
        id: "c97876ee-b5fc-45ba-82a8-fc2232aeb9ba",
        name: "Glows",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
      {
        id: "9df88d76-6a29-4b8b-b025-6304bbf213e9",
        name: "Neck",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
      {
        id: "dbe4c97c-acca-4e17-8226-bbc8da605685",
        name: "Lips",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
      {
        id: "d5f1b2be-b9ab-49e0-b0a9-0b4c1d163061",
        name: "Face sides",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
      {
        id: "d0cc836b-1c0e-4a4f-a012-9591a2e6d1f1",
        name: "Forehead",
        categoryId: "f270b03e-73e7-4f53-bbaa-35f985cd9988",
        categoryEntries: [],
      },
    ],
  },
  {
    id: "31d201d4-9837-48d6-a2ba-45b380afe61b",
    name: "Body care",
    subCategories: [
      {
        id: "a6e82d31-0a34-4aa4-9565-92f02847e8c8",
        name: "From neck to toe",
        categoryId: "31d201d4-9837-48d6-a2ba-45b380afe61b",
        categoryEntries: [],
      },
      {
        id: "9f44594e-9813-4e6f-bdca-24e070c5102a",
        name: "Underarm",
        categoryId: "31d201d4-9837-48d6-a2ba-45b380afe61b",
        categoryEntries: [],
      },
      {
        id: "994bccff-1734-4278-9dae-4d305b3f493b",
        name: "Nailing",
        categoryId: "31d201d4-9837-48d6-a2ba-45b380afe61b",
        categoryEntries: [],
      },
    ],
  },
  {
    id: "94d3c14a-da55-43f2-983e-741d9972919c",
    name: "Hair treatment",
    subCategories: [
      {
        id: "73316675-4542-461e-b1a7-31d966b87746",
        name: "All hair treatments (Regrow, plantation)",
        categoryId: "94d3c14a-da55-43f2-983e-741d9972919c",
        categoryEntries: [],
      },
      {
        id: "83628d43-49d0-40df-ab97-31fbeb7a39a5",
        name: "All kinds of textures",
        categoryId: "94d3c14a-da55-43f2-983e-741d9972919c",
        categoryEntries: [],
      },
      {
        id: "66c9c126-c459-498c-9c96-bf06b11ca7ef",
        name: "All styling (straightening, Folds)",
        categoryId: "94d3c14a-da55-43f2-983e-741d9972919c",
        categoryEntries: [],
      },
      {
        id: "f43dd0cc-13c9-4ded-ad9b-c8e033bb1b1d",
        name: "Dandruff",
        categoryId: "94d3c14a-da55-43f2-983e-741d9972919c",
        categoryEntries: [],
      },
      {
        id: "20b9c46b-31c8-4c7e-a609-9718a09ee7dc",
        name: "Color removal",
        categoryId: "94d3c14a-da55-43f2-983e-741d9972919c",
        categoryEntries: [],
      },
    ],
  },
  {
    id: "dd9a82b8-deaf-473c-81bb-1645c278c434",
    name: "Spa/ Massage",
    subCategories: [
      {
        id: "c164ab72-4518-4bfa-bd12-3552b8c09ef0",
        name: "All hair spas",
        categoryId: "dd9a82b8-deaf-473c-81bb-1645c278c434",
        categoryEntries: [],
      },
      {
        id: "6bfdbedf-537a-45ce-8e12-3aa19d93bd8b",
        name: "Head massages",
        categoryId: "dd9a82b8-deaf-473c-81bb-1645c278c434",
        categoryEntries: [],
      },
      {
        id: "c792321b-522d-4aa1-b514-c218a84ff915",
        name: "All body spas/massages",
        categoryId: "dd9a82b8-deaf-473c-81bb-1645c278c434",
        categoryEntries: [],
      },
      {
        id: "e9281f19-576b-4d53-94c3-e0f4549fe43e",
        name: "All oil spas/massages",
        categoryId: "dd9a82b8-deaf-473c-81bb-1645c278c434",
        categoryEntries: [],
      },
      {
        id: "e0c6443d-9c95-4e78-bc0b-47d3f686bd04",
        name: "Body pains massages",
        categoryId: "dd9a82b8-deaf-473c-81bb-1645c278c434",
        categoryEntries: [],
      },
      {
        id: "2dbc9dcb-6ddc-437e-b765-6e47fe4df744",
        name: "All spas/massages",
        categoryId: "dd9a82b8-deaf-473c-81bb-1645c278c434",
        categoryEntries: [],
      },
    ],
  },
  {
    id: "ec1c0103-cbd3-400d-9cc2-58e5f6c0f119",
    name: "Bridal/Groom",
    subCategories: [
      {
        id: "e2e99cd8-5c0e-4c9f-bdb6-5c8f32faa8a0",
        name: "All packages",
        categoryId: "ec1c0103-cbd3-400d-9cc2-58e5f6c0f119",
        categoryEntries: [],
      },
    ],
  },
];

const CategorySelection = () => {

  const [categorySelected, setCategorySelected] = useState({
    name: 'Choose a category below',
    id: ''
  });

  const [subCategroySelected, setSubCategorySelected] = useState({
    name: 'Choose a sub-category below',
    id: ''
  })

  useEffect(() => {
    setSubCategorySelected({
      name: 'Choose a sub-category below',
      id: ''
    })
  }, [categorySelected]);

  const [nextScreenBtn, setNextScreenBtn] = useState(false);

  const [addingCategoryLoad, setAddingCategoryLoad] = useState(false);

  return (
    <>
      <ProfileSteps currentStep={3} />

      <main className={styles.category__main}>

        <h3>Category Selection</h3>
        <p>Add items based on category & sub-categories.</p>
        
        {/* Category Dropdown */}

        <div className={styles.category__selection}>
          
          <h4>Select a category</h4>
          <CustomDropdown dropSelected={categorySelected} setDropSelected={setCategorySelected} dropMenu={categories} />

          {
            categorySelected.id && (
              <div className={styles.category__selection}>
                <h4>Select a sub category</h4>
                <CustomDropdown dropSelected={subCategroySelected} setDropSelected={setSubCategorySelected} dropMenu={categories.find((category => category.id === categorySelected.id))?.subCategories as {id: string, name: string}[]} />

                {
                  subCategroySelected.id && (
                    <form className={styles.item__form} onSubmit={async(e) => {
                      e.preventDefault();
                      setAddingCategoryLoad(true);
                      const toastId = createToast('loading', 'Adding Item...');
                      try {

                        const formData = new FormData(e.currentTarget);
                        const response = await addCategoryItem(formData);

                        if (response.status === 'success') {
                          createToast('success', response.message, toastId);
                          setNextScreenBtn(true);
                        } else {
                          createToast('error', response.message, toastId);
                        }
                        
                      } catch (error) {
                        createToast('error', 'Issues adding item. Try again', toastId);
                      } finally {
                        setAddingCategoryLoad(false);
                      }
                    }}>
                      <h4>Add an Item</h4>
                      <div className={styles.form__main}>
                        <input type="hidden" name="subCategoryId" value={subCategroySelected.id} />
                        <FormInput labelId="itemName" label="Item Name" fieldType="text" placeholder="Enter item name" fieldTitle="Provide a valid item name" fieldName="name" required={true} />
                        <FormInput labelId="itemTime" label="Available Time" fieldType="time" placeholder="Enter available time" fieldTitle="Provide a valid time" fieldName="time" defaultVal="10:00" required={true} />
                        <FormInput labelId="itemPrice" label="Item Price" fieldType="text" placeholder="Enter item price" fieldTitle="Provide a valid item price" fieldName="price" required={true} pattern="^\+?\d+$" />
                      </div>
                      <button disabled={addingCategoryLoad} aria-disabled={addingCategoryLoad} type="submit" title="Add Item" aria-label="Add Item">Add Item</button>
                    </form>
                  )
                }

              </div>
            )
          }

        </div>

        {/* Category Dropdown */}

        {/* Next Btn */}

        {
          nextScreenBtn && (
            <div className={styles.next__btn}>
              <Link href="/profile/verification">Next Step</Link>
            </div>
          )
        }

        {/* Next Btn */}

      </main>
    </>
  );
};

export default CategorySelection;


/*

{
  id: string,
  name: string,
  subCategories: {
    id: string,
    name: string,
    categoryId: string,
    categoryEntries: []
  }[]
}[]

*/