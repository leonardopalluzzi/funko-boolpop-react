import { useState, useEffect } from 'react';
import styles from '../../assets/css_modules/chatBot.module.css';
import { Link } from 'react-router-dom';
import Loader from '../dumb/Loader.ui';


export default function ChatBot({ onClose }) {

    const [question, setQuestion] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('chat_messages') || '[]');
        setMessages(savedMessages);
    }, []);

    useEffect(() => {
        localStorage.setItem('chat_messages', JSON.stringify(messages));
    }, [messages]);


    function addMessage(role, content) {
        setMessages(prev => [...prev, { role, content }]);
    }


    function handleSubmit() {
        console.log('submitChatBot');
        if (!question.trim()) return;

        const useMessage = question
        addMessage('user', useMessage)
        setLoading(true)

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
                    addMessage('bot', data)

                } else {
                    addMessage('bot', 'Looks like there are no related products to your research :(')
                }
            })
            .catch(err => {
                addMessage('bot', err.message)
            })
        setLoading(false)
        setQuestion('')
    }

    console.log(messages);

    function renderMessages(role, msgState, msg, i) {
        switch (role) {
            case 'user':
                return <p key={i} className={styles.sent_text}><strong>You:</strong> {msg}</p>;
            case 'bot':
                switch (msgState) {
                    case 'json':
                        if (msg.results.length == 0) {
                            return (<p key={i} className={styles.sent_text}>Looks Like there are no releated products to your research :(</p>)
                        }
                        return (
                            <>
                                <div key={i} className={styles.sent_text} >
                                    <ul className='list-unstyled'>
                                        <h5>Here is what I've found</h5>
                                        {msg.results.map((item, idx) => (
                                            <>
                                                <Link key={idx} to={`/${item.slug.toLowerCase().replaceAll(' ', '-').replaceAll('(', '').replaceAll(')', '')}`}>
                                                    <ul className='col-8 my-2 p-2 border w-100 rounded-2'>
                                                        <div className="row">
                                                            <div className="col-8">
                                                                {item.name}
                                                            </div>
                                                            <div className="col-4">
                                                                {item.price} €
                                                            </div>
                                                        </div>
                                                    </ul>
                                                </Link>
                                            </>
                                        ))}
                                    </ul>

                                </div >
                            </>
                        )
                    case 'text':
                        return <div key={i} className={styles.sent_text}><strong>BoolBot: </strong>{msg.results}</div>
                }
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
                    {messages.length === 0 && <p className={styles.sent_text}>Hi! How can I help you?</p>}
                    {messages.map((item, i) => renderMessages(item.role, item.content.state, item.content, i))}
                    {loading && <div><Loader /></div>}
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