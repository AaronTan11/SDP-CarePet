import React from "react";
import styles from "../../styles/components/Card.module.scss";


function Card({title,imageUrl,body,age,type, id}){
    return(
        
        <div className={styles.card}>
            <div className={styles.image}>
                <img src={imageUrl} alt=''/>
            </div>
            <div className={styles.content}>
            <div className={styles.title}>
                <h3>{title}</h3>
                <h3>{age}</h3>
                <h3>{type}</h3>
            </div>
            <div className={styles.body}>
                <p>{body}</p>
            </div>
            </div>
            <div className={styles.btn}>
                <button>
                    <a href="/adoptionform">
                        Apply Here
                    </a>
                </button>
            </div>
        </div>
    )

}

export default Card;

