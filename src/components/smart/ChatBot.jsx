import { useState } from 'react';
import styles from '../../assets/css_modules/chatBot.module.css';
import { Link } from 'react-router-dom';


export default function ChatBot({ onClose }) {

    const [question, setQuestion] = useState('')

    const [answer, setAnswer] = useState({
        state: 'waiting'
    })

    function handleSubmit() {
        console.log('submitChatBot');

        setAnswer({
            state: 'loading',
            message: 'Thinking...'
        })

        fetch('http://localhost:3000/api/v1/chatbot', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ message: question })
        })
            .then(res => {
                console.log('primo then');

                return res.json()
            })
            .then(data => {
                console.log(data);

                if (data.results) {
                    setAnswer({
                        state: 'success',
                        answer: data
                    })
                } else {
                    setAnswer({
                        state: 'empty',
                        answer: ''
                    })
                }
            })
            .catch(err => {
                setAnswer({
                    state: 'error',
                    message: err.message
                })
            })
        setQuestion('')

    }

    function renderAnswer() {
        switch (answer.state) {
            case 'waiting':
                return <div>HI! how can i help you?</div>
            case 'loading':
                return <div>{answer.message}</div>
            case 'error':
                return <div>There was an error rendering the answer: {answer.message}</div>
            case 'empty':
                return <div>No answer found</div>
            case 'success':
                switch (answer.answer.state) {
                    case 'json':
                        return <div className={styles.sent_text}>
                            <ul className='list-unstyled'>
                                {answer.answer.results.map(item => (
                                    <>
                                        <Link to={`/${item.slug.toLowerCase().replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '')}`}>
                                            <ul className='col-8 my-2 p-2 border w-100 rounded-2'>
                                                <div className="row">
                                                    <div className="col-8">
                                                        {item.name}
                                                    </div>
                                                    <div className="col-4">
                                                        {item.price}
                                                    </div>
                                                </div>
                                            </ul>
                                        </Link>
                                    </>
                                ))}
                            </ul>

                        </div>;
                    case 'not-a-json-fallback':
                        return <div>{answer.answer.results}</div>
                    case 'not-a-json-failed':
                        return <div>{answer.answer.results}</div>
                    case 'text':
                        return <div>{answer.answer.results}</div>
                }

            default:
                return <div>Nessun azione performata</div>;
        }
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
                    {
                        renderAnswer()
                    }
                </div>

                <div className={styles.form_chat}>
                    <form method='POST' onSubmit={(e) => { e.preventDefault(); handleSubmit() }} action="">
                        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} className={styles.textarea_chat} type="text" />
                        <button type='submit' className={styles.btn_chat}>
                            <i class="fa-regular fa-paper-plane"></i>
                        </button>
                    </form>
                </div>

            </div>



        </div>
    )
}