import { useState } from 'react';
import styles from '../../assets/css_modules/chatBot.module.css';


export default function ChatBot({ onClose }) {

    function onsubmit() {
        console.log('submitChatBot');

    }

    return (

        <div className={styles.chatbot_content}>
            <div className={styles.chatbot_header}>
                <h3>Chat Assistant</h3>
                <button
                    className={styles.close_button}
                    onClick={onClose}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className={styles.chat_container}>
                <div className={styles.chat_messages}>
                    <p className={styles.sent_text}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae cumque voluptatem, ut eum hic excepturi </p>
                    <p className={styles.sent_text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, veniam cupiditate obcaecati voluptates quia nam inventore libero eius sed expedita?</p>
                    <p className={styles.sent_text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita qui fuga officia deserunt voluptates perferendis incidunt suscipit deleniti quas voluptas!</p>
                    {/* Qui andranno i messaggi */}
                </div>

                <div className={styles.form_chat}>
                    <form onSubmit={(e) => { e.preventDefault(); onsubmit() }} action="">
                        <textarea className={styles.textarea_chat} type="text" />
                        <button type='submit' className={styles.btn_chat}>
                            <i class="fa-regular fa-paper-plane"></i>
                        </button>
                    </form>
                </div>

            </div>



        </div>
    )
}