import { useState, useEffect, useRef } from 'react';
import styles from '../../assets/css_modules/chatBot.module.css';
import { Link } from 'react-router-dom';
import Loader from '../dumb/Loader.ui';


export default function ChatBot({ onClose }) {

    const [question, setQuestion] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('chat_messages') || '[]');
        setMessages(savedMessages);
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (hasLoaded) {
            localStorage.setItem('chat_messages', JSON.stringify(messages));
        }
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);


    function addMessage(role, content) {
        setMessages(prev => [...prev, { role, content }]);
    }


    function handleSubmit() {
        console.log('submitChatBot');
        if (!question.trim()) return;

        const userMessage = {
            state: 'text',
            results: question
        };

        addMessage('user', userMessage)
        setLoading(true)
        setQuestion('')

        fetch('http://localhost:3000/api/v1/chatbot', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ message: question, context: messages.slice(-10) })
        })
            .then(res => {
                console.log('primo then');

                return res.json()
            })
            .then(data => {
                console.log(data);

                if (data.state == 'json') {
                    function isValidProduct(item) {
                        return (
                            item &&
                            typeof item.slug === 'string' &&
                            typeof item.name === 'string' &&
                            typeof item.price === 'number' &&
                            typeof item.quantity === 'number'
                        );
                    }

                    const isValidArray = Array.isArray(data.results) && data.results.every(isValidProduct);

                    if (isValidArray) {
                        addMessage('bot', data)

                    } else {
                        addMessage('bot', {
                            state: 'text',
                            results: 'Oops! I could not understand the response format. Please try asking differently'
                        })
                    }
                } else if (data.state == 'text') {
                    addMessage('bot', data)
                }
            })
            .catch(err => {
                addMessage('bot', err.message)
            })
            .finally(() => {
                setLoading(false)

            })
    }

    function renderMessages(role, msgState, msg, i) {
        switch (role) {
            case 'user':
                return <p key={i} className={styles.sent_text}><strong>You:</strong> {msg.results}</p>;
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
                    <div ref={messagesEndRef} />
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