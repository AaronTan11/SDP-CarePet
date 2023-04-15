import Image from "next/image";
import style from "../../styles/components/Services.module.scss";

export default function Services({ image, title, content }) {
   return (
      <>
         <section className={style.services}>
            <div>
               <Image src={image} width={130} height={130} />
            </div>
            <div className={style.title}>{title}</div>
            <div className={style.content}>{content}</div>
         </section>
      </>
   );
}
