"use client";
import styles from "@/components/linksEditor/linksEditor.module.css";
import { backendBaseURL } from "@/constants/index";
import { Reorder, useDragControls } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "@/components/linksEditor/link/link";
import { Toaster, toast } from "sonner";
import AddLinkButton from "./addLink/addLinkButton";
import AddHeaderButton from "./addHeader/addHeaderButton";
import TreePreview from "../treePreview/treePreview";
import TreePreviewToggleButton from "../treePreview/treePreviewToggleButton/treePreviewToggleButton";
import { useDebounce } from "@/hooks/debounce";
import { useLocalstorage } from "@/hooks/localStorage";
import { useRouter } from "next/navigation";
import { useTreeUID } from "@/hooks/treeUID";

export default function LinksEditor() {
  const { push } = useRouter();
  const { setItem, getItem, removeItem } = useLocalstorage(`selectedTree`);
  let treeUID = useTreeUID();
  const [areLinksFetched, setAreLinksFetched] = useState();
  const [links, setLinks] = useState([
    // {
    //   title: "Loading",
    //   URL: "loading",
    //   UID: "1111111",
    // },
    // {
    //   title: "Loading",
    //   URL: "loading",
    //   UID: "2222222222",
    // },
    // {
    //   title: "Loading",
    //   URL: "loading",
    //   UID: "33333333",
    // },
  ]);
  const [reorderedLinksUID, setReorderedLinksUID] = useState();
  const debouncelinksUIDOrder = useDebounce(reorderedLinksUID, 3000);

  // const getDefaultTreeUID = async ()=>{
  //   try {
  //     let res = await fetch(
  //       `${backendBaseURL}/tree/user-default-treeUID`,
  //       {
  //         method: "GET",
  //         cache: "no-store",
  //         credentials: "include",
  //         headers: {
  //           Accept: "applications/json",
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Credentials": true,
  //         },
  //       }
  //     );
  //     if (res.ok) {
  //       let responseData = await res.json();
  //       return { success: true, error: false, response: responseData, statusCode: res.status };
  //     } else {
  //       let responseData = await res.json();
  //       return { success: false, error: false, response: responseData, statusCode: res.status };
  //     }
  //   } catch (error) {
  //     return { success: false, error: error, response: error};
  //   }
  // }

  // const updateTreeUID = async () => {
  //   let UID = getItem();

  //   if (!UID) {
  //     let { success, response, error, statusCode } = await getDefaultTreeUID();
  //     if (success) {
  //       console.log('got treeUID', response.treeUID);
  //       UID = response.treeUID;
  //     } else{
  //       if (error) {
  //         // if catched error in fetch
  //         console.log("Some error occured", error);
  //         toast.error(`Some error occured: ${error.message}`)
  //       } else{
  //         //no error in fetch and success is false(from server)
  //         toast.error(`${response.message}`)
  //         if(statusCode === 404){
  //           removeItem()
  //          return  push("/admin/selectTree?removeSelectedTree")
  //         }
  //         console.log("cant get treEUID", response.message );

  //       }
  //     }
  //     console.log("setting selected tree cookie as no tree was selected");
  //     setItem(UID);
  //   }

  //   setTreeUID(UID)
  // };

  const updateLinks = async () => {
    let { success, response, error, statusCode } = await getAllLinks(treeUID);
    if (success) {
      console.log("success on updateLinks", response);
      setLinks(response.links);
      setAreLinksFetched(true);
    } else {
      if (error) {
        // if catched error in fetch
        setLinks([]);
        toast.error("Error occured while fetching data");
        console.log("Error occured while fetching data", error);
      } else {
        //no error in fetch and success is false(from server)
        setLinks([]);
        toast.error(`Link not added: ${response.message}`);
        console.log(`code in updateLinks`, statusCode);
        if (statusCode === 400 || statusCode === 401) {
          removeItem();
          push("/admin/selectTree?removeSelectedTree");
        }
      }
    }
  };

  const getAllLinks = async (treeUID) => {
    try {
      let res = await fetch(`/api/tree/adminAllTreeLinks/${treeUID}`, {
        method: "GET",
        cache: "no-store",
        credentials: "include",
        headers: {
          Accept: "applications/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (res.ok) {
        let responseData = await res.json();
        return { success: true, error: false, response: responseData };
      } else {
        let responseData = await res.json();
        return {
          success: false,
          error: false,
          response: responseData,
          statusCode: res.status,
        };
      }
    } catch (error) {
      return { success: false, error: error, response: error };
    }
  };

  const deleteLink = async (UID) => {
    try {
      console.log("posing");
      let res = await fetch(
        `/api/tree/edit/delete/link/${UID}`,
        {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            linkUID: UID,
            treeUID,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      if (res.ok) {
        let responseData = await res.json();
        setLinks(responseData.links);
      } else {
        let responseData = await res.json();
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("catched error", error);
    }
  };

  function handelLinksOrderChange(value) {
    setLinks(value);
    let GeneratedLinksUIDArray = value.map((link) => link.UID);
    setReorderedLinksUID(GeneratedLinksUIDArray);
  }

  async function sendLinksUIDToBackend(linksUIDArray) {
    toast.info(`sendLinksUIDToBackend function is running`);
    try {
      const res = await fetch(
        `/api/tree/edit/links-order/${treeUID}`,
        {
          method: "POST",
          cache: "no-store",
          body: JSON.stringify({
            treeUID,
            linksUIDArray,
          }),
          credentials: "include",
          headers: {
            Accept: "applications/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      if (res.ok) {
        const responseData = await res.json();
      } else {
        const responseData = await res.json();
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error updating links order:", error);
      toast.error("Error updating links order");
    }
  }

  useEffect(() => {
    if (treeUID) {
      updateLinks();
    }
  }, [treeUID]);

  useEffect(() => {
    if (areLinksFetched) {
      sendLinksUIDToBackend(debouncelinksUIDOrder);
    }
  }, [debouncelinksUIDOrder]);

  return (
    <>
      {!treeUID ? (
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          quo eligendi necessitatibus similique ex facere, ipsum sapiente.
          Corporis recusandae cupiditate inventore. Iure cum corporis earum est!
          Dignissimos eaque debitis aliquam aliquid voluptates sunt, hic nulla
          tempore laboriosam reprehenderit perferendis quasi rem vitae sit
          deleniti sequi voluptatibus? Neque perferendis magnam, quaerat
          suscipit consequatur voluptatem soluta sed! Nihil pariatur enim,
          repudiandae labore quam aliquid tenetur. Iure ut inventore laboriosam
          dolorem iusto expedita repudiandae dolore sed dolorum obcaecati
          consectetur, ipsam voluptates maxime voluptatem adipisci deserunt nam?
          Obcaecati laborum tempora, assumenda expedita voluptas repudiandae,
          consequatur necessitatibus, vitae sunt minus porro vel beatae odit
          eaque ab blanditiis rem fugiat sit facilis quisquam hic praesentium.
          Id magnam perspiciatis est ut odit optio dicta quidem distinctio
          voluptas maxime dolorum natus voluptate iste possimus iusto, deserunt
          a quos, sunt dolorem itaque rem quod autem nobis! Error laboriosam
          laborum veniam nobis perferendis adipisci eveniet iusto reprehenderit
          sint dolor, nulla rerum quia. Sequi voluptate nemo provident, vitae
          amet rerum asperiores dolorum odit unde? Provident doloribus
          dignissimos vel ipsam veniam voluptatum quibusdam non error dolor
          dolores reprehenderit quisquam velit soluta accusantium quidem
          consequatur, sed eveniet, debitis quos tempore magni necessitatibus
          culpa! Corporis fugit distinctio quae nesciunt, perferendis numquam
          omnis harum consequatur, excepturi ipsam expedita! Illo doloribus fuga
          hic numquam eaque laudantium voluptatem itaque odit, in fugit maiores
          odio quas, repellat corrupti iusto quidem mollitia nihil maxime
          quibusdam. Quidem libero possimus inventore nisi velit enim quas
          dignissimos veritatis blanditiis minima alias, sequi repudiandae
          tenetur doloremque sapiente cumque soluta voluptate nostrum dolore
          fugiat quis cum? Nemo perferendis quibusdam nesciunt quisquam,
          doloribus, nobis iure quae quidem maxime tempore labore facilis dolore
          tempora voluptas, ab reiciendis similique. Similique sapiente sed
          repudiandae obcaecati reprehenderit exercitationem quod eos architecto
          accusamus laborum, iusto nam quisquam quaerat sequi quae officia
          aperiam ut aut nulla ab voluptatibus consectetur! Cum possimus, minus
          eligendi quas sequi ex quam praesentium nihil ducimus in ab natus
          neque molestias. Beatae, molestias nisi repellendus et magni a
          consectetur debitis. Dolor non tenetur ullam quisquam quas quo esse
          praesentium nihil, fugit maxime consectetur id incidunt illo alias
          quidem ut a fuga ipsam, animi totam nam temporibus omnis laudantium.
          Maiores quidem earum temporibus a officia ut est facere maxime. Vel
          iure et quia sequi inventore autem minus ut, unde nesciunt error
          dignissimos nobis repudiandae quae expedita. Reprehenderit incidunt
          repellendus assumenda doloremque recusandae quis, corrupti atque
          veniam impedit, consequatur rem laborum quam cum aliquid aspernatur
          facilis asperiores inventore maiores modi praesentium sint adipisci
          amet voluptas eos. Facilis impedit velit error eos corrupti, unde odio
          dolor qui atque laborum dicta vero sed? Itaque quas modi,
          necessitatibus ipsa quos eveniet magnam, inventore corporis maxime
          iusto accusantium quia quo eum odit illum hic fuga nisi at dicta nam?
          Veritatis laudantium rem quod officia eveniet! Autem exercitationem
          quasi ducimus consectetur! Eius amet velit ex consequuntur impedit
          quidem nam autem qui. Obcaecati officia accusantium ad optio odit
          dicta totam, voluptates aperiam dolorem qui earum reprehenderit
          explicabo blanditiis similique! Eius iusto asperiores odit facere rem
          laboriosam possimus quisquam molestiae non harum tempora sit quo magni
          voluptatibus dignissimos amet, perferendis enim fuga natus repudiandae
          tenetur est sequi eligendi consequatur. Veniam delectus, accusamus
          nihil rerum in fugiat illo ipsum, sit aperiam vero neque nostrum
          obcaecati alias? Aliquam fuga necessitatibus rem placeat architecto.
          Iusto rem ducimus dolores neque voluptas, iure adipisci deserunt
          culpa, sed provident voluptatibus illum tempore laboriosam omnis,
          quisquam voluptate veritatis modi voluptates blanditiis porro eius.
          Suscipit eum quam sint placeat recusandae sapiente, veniam culpa quasi
          delectus dicta fugiat nisi eos quo tempora ducimus, laboriosam neque
          natus inventore labore nesciunt quaerat? Enim accusantium ipsam alias
          dignissimos quod dolore reiciendis, exercitationem nisi in accusamus
          dolorem, beatae corporis at, amet quisquam aperiam. Itaque nobis sequi
          perferendis, nam aperiam reiciendis inventore sed maiores minus
          similique laboriosam veritatis! Reiciendis suscipit aut veritatis
          autem maiores. Sapiente neque quae necessitatibus quam nisi ex enim
          saepe dignissimos perspiciatis facere officiis temporibus minima modi
          qui aut possimus, nobis dicta. Animi hic voluptas obcaecati sint.
          Corrupti, tenetur! Ullam blanditiis at quasi tenetur quia iste rem
          reprehenderit veniam, voluptates delectus voluptas asperiores mollitia
          non numquam doloremque commodi vitae expedita! Ipsam magni id
          recusandae blanditiis, maxime porro odio tempore quo, fugit et eius
          placeat rerum quasi modi corporis asperiores dolorum fugiat officiis
          beatae accusantium repudiandae voluptatum sit ipsum? Quibusdam
          consectetur officia animi libero vero hic quod sequi perspiciatis
          eveniet ipsum, commodi dolorem repudiandae et, delectus assumenda.
          Praesentium, corporis! Veniam fugit ab officia dignissimos consectetur
          vitae mollitia quia minima dolor magni in fugiat placeat sit non culpa
          animi beatae hic tempora excepturi, commodi repudiandae quisquam
          expedita. Molestiae consequuntur aspernatur neque dolorum officiis
          velit tenetur, animi eos nesciunt delectus. Temporibus suscipit harum
          ducimus obcaecati, quas architecto exercitationem eveniet consequatur
          illum tempora odio corporis asperiores esse dolores voluptatum et cum
          deleniti commodi enim, ab ea? Minima possimus atque dolorum illo
          fugiat consequatur est earum accusamus ab totam beatae, officiis
          impedit numquam saepe, dolores labore quis nobis amet aliquam eligendi
          alias deleniti nostrum. Excepturi assumenda ad nemo accusamus tempora,
          architecto unde quis fugiat soluta. Assumenda, molestiae. Magnam
          beatae est, nihil ipsum ad eligendi. Cum ut, nobis veniam sunt harum
          maxime magnam repellendus voluptates suscipit placeat id voluptatum
          ipsum, numquam illum corrupti in culpa, quibusdam fuga sequi eveniet?
          Accusantium debitis sunt dolore non quisquam quae nam nihil corrupti.
          Voluptatum obcaecati quae eum cum optio. Sunt dicta numquam minima,
          delectus inventore quas sequi illo molestias culpa rerum quae rem
          adipisci. Cum beatae nam omnis eos pariatur nulla maiores quibusdam
          voluptatem voluptate quos voluptatum eaque praesentium consectetur
          consequatur minus ratione esse sit corrupti veritatis, facere nesciunt
          tenetur. Dicta neque magni deserunt provident nostrum quam atque.
          Exercitationem ut maxime totam, atque non, dicta facilis pariatur
          laudantium quis itaque velit ex mollitia ad fugit quas accusamus saepe
          consequuntur distinctio nemo libero consequatur doloribus deserunt.
          Aspernatur quod nobis quisquam voluptatem soluta asperiores itaque,
          excepturi aliquid. Inventore, illum omnis. Neque quasi quibusdam
          aperiam nam voluptates sint iste harum non nemo velit, reiciendis id
          culpa distinctio ad minima enim quia alias. Similique veniam eligendi
          quod libero obcaecati debitis! Quia inventore asperiores voluptas
          culpa cupiditate pariatur suscipit odit, eos saepe.
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <div className={styles.linksEditorContainer}>
              <div className={styles.addLinkAndHeaderContainer}>
                <AddLinkButton setLinks={setLinks} treeUID={treeUID} />
                {/* <AddLinkButton /> */}
                <AddHeaderButton />
              </div>

              <Reorder.Group
                values={links}
                onReorder={handelLinksOrderChange}
                layoutScroll
                className={styles.linksContainer}
              >
                {links.map((link, index) => (
                  <Link
                    key={link.UID}
                    link={link}
                    treeUID={treeUID}
                    deleteLink={deleteLink}
                  />
                ))}
              </Reorder.Group>
            </div>

            <div className={styles.treePreviewContainer}>
              <TreePreview treeUID={treeUID} />
            </div>
          </div>
          <TreePreviewToggleButton treeUID={treeUID} />
          <Toaster position="bottom" expand={true} richColors />
        </>
      )}
    </>
  );
}
