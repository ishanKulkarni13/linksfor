"use client";
import { useState } from "react";
import styles from "./createNewTree.module.css";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLocalstorage } from "@/hooks/localStorage";
import { useSelectTree } from "@/hooks/selectTree";

export default function CreateNewTreePage() {
  const { push } = useRouter();
  const selectTree = useSelectTree();
  const [newTreeData, setNewTreedata] = useState({});

  const handleInputChange = (e) => {
    setNewTreedata({ ...newTreeData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    toast.loading(`Creating Tree`, {
      id:'newTree'
    });

    try {
      const res = await axios.post(
        `/api/tree/new`,
        { treeName: newTreeData.treeName },
        { withCredentials: true }
      );

      toast.success(`Created Tree,`, {
        description: 'redirecting...',
        id: 'newTree',
        duration: 2000
      });
      // selectTree(res.data.tree.UID)
      selectTree(res.data.tree.UID)
      push("/admin/tree/edit/appearance");
    } catch (error) {
      console.log(error);
      if (error.response) {
        // if server responded
        
        toast.error(error.response.data.message, {
          id:'newTree'
        });
      } else if (error.request) {
        //req was made but go no response
        toast.error(`error occured`,{
          id:'newTree'
        });
      } else {
        toast.error(`some error occured: ${error.message}`,{
          id:'newTree'
        });
      }
    }
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.topContainer}>
          <h1>Create New Tree</h1>
          <p className={styles.description}>
            Select a name for your tree. The other things such as appearance,
            bio and the links can be customised on the next page
          </p>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={`${styles.nameContainer} ${styles.inputContainer}`}>
              <label className={styles.lable}>Tree Name</label>
              <input
                className={styles.input}
                placeholder="New tree's Name"
                type="text"
                name="treeName"
                value={newTreeData.treeName}
                onChange={handleInputChange}
              />
            </div>

            <button className={styles.createTreeButton} type="submit">
              {" "}
              Create tree
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
