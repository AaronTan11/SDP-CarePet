import styles from "./service.module.scss";

function Service(){
    return(

        <div className={styles.bg}>
        <div><h1 className={styles.h1}>OUR Services</h1>
        <h3 className={styles.h3}>Care<span className={styles.s1}>Pet</span> Services</h3>
        <div className={styles.card}>
            <div className={styles.image}>
            <img src="https://static.wixstatic.com/media/7cd323_d28ffd44527d4b4b9fdbb22b061979a8~mv2.jpeg/v1/fill/w_925,h_616,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/7cd323_d28ffd44527d4b4b9fdbb22b061979a8~mv2.jpeg%22" alt=""></img> 
            <div className={styles.title}>
            PET GROOMING
            </div>
            <div className={styles.body}>
            <h2 className={styles.body}>Better Hygiene and Smell !</h2>
            <h2 className={styles.body}>Check and Treat Fleas !</h2>
            <h2 className={styles.body}>Early Detection Of Any Skin and Health Problems !</h2>
            </div>
                <button className={styles.btn}>
                Select
                </button>
            </div>
            <div className={styles.image}>
             <img src="https://www.caninecountryclubaz.com/wp-content/uploads/2019/03/shutterstock_140724097-min-768x512.jpg" alt=""></img> 
            <div className={styles.title}>
            PET HOUSE BOARDING
            </div>
            <div className={styles.body}>
            <h2>Benefits for your pet include:</h2>
            <li>Pets are cared for in a safe or secure environment</li>
            <li>Maintaining medical treatment if necessary</li>
            <li>Ensure physical health</li>
            <h2>The benefits to you include:</h2>
            <li>Not having to impose on family, friends or neighbors</li>
            <li>Knowing your pet is in caring hands </li>
            </div>
                <button className={styles.btn}>
                Select
                </button>
            </div>
            <div className={styles.image}>
             <img src="https://www.houstonansweringservices.com/site/wp-content/uploads/2018/08/veterinarian.jpg" alt=""></img> 
            <div className={styles.title}>
            PET CLINIC
            </div>
            <div className={styles.body}>
            <h2 className={styles.body}>Early Detection of Disease</h2>
            <h2 className={styles.body}>Preventive Care</h2>
            <h2 className={styles.body}>Bad Pet Behavior</h2>
            <h2 className={styles.body}>Advanced Pet Care</h2>
            </div>
                <button className={styles.btn}>
                Select
                </button>
            </div>
            <div className={styles.image}>
             <img src="https://images.squarespace-cdn.com/content/v1/56cd437927d4bddd6eb8313d/1562253471768-QOZ3SG3OIN7IS3XJ83D2/Pet+Feeding.jpg?format=1500w" alt=""></img> 
            <div className={styles.title}>
            PET FEEDING
            </div>
            <div className={styles.body}>
            <h2 className={styles.body}>No More Early Morning Wake-UP Calls</h2>
            <h2 className={styles.body}>Easy Weight Control</h2>
            <h2 className={styles.body}>No More Guilt Over Pets Not Getting Their Food</h2>
            </div>
                <button className={styles.btn}>
                Select
                </button>
            </div>
        </div>
        </div>
        </div>
        
    );
}


export default Service