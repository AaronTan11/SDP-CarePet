import React from "react";
import styles from '../styles/App.module.scss';
import Card from "../components/AdoptionCards/Card";

function Adoption() {

    return (
        <div className={styles.container}>


        <div className={styles.Adoption}>
            <Card
            id='1'
            title='Kiki'
            age='3 years'
            type='Poodle'
            imageUrl='https://picsum.photos/id/237/200/300'
            body='Hello, I am a small and cute little puppy. I like to stick around people.'
            />

            <Card
            title='Goldy'
            age='3 years'
            type='Poodle'
            imageUrl='https://picsum.photos/id/237/200/300'
            body='Hello, I am a small and cute little puppy. I like to stick around people.'
            />

            <Card
            title='Kulu'
            age='3 years'
            type='Poodle'
            imageUrl='https://picsum.photos/id/237/200/300'
            body='Hello, I am a small and cute little puppy. I like to stick around people.'
            />

            <Card
            title='Pilu'
            age='3 years'
            type='Poodle'
            imageUrl='https://picsum.photos/id/237/200/300'
            body='Hello, I am a small and cute little puppy. I like to stick around people.'
            />

            <Card
            title='Loly'
            age='3 years'
            type='Poodle'
            imageUrl='https://picsum.photos/id/237/200/300'
            body='Hello, I am a small and cute little puppy. I like to stick around people.'
            />

            <Card
            title='Anson'
            age='3 years'
            type='Poodle'
            imageUrl='https://picsum.photos/id/237/200/300'
            body='Hello, I am a small and cute little puppy. I like to stick around people.'
            />
        </div>
    </div>
    )
}

export default Adoption;
