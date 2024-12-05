import { useEffect, useState } from 'react';
import styles from '../../styles/modules/components/basic.module.css';
import { serverPath } from '../../services/settings';
import { Link } from 'react-router-dom';

const SubscriberItem = ({hest}) => {

    console.log("data", hest)
    
    return <div className={styles.listItem}>
        {hest.name} {hest.email}
        <Link to={`/subscribers/${hest._id}`}>Til Subscriber siden</Link>
    </div>

}

const SubscribersList = () => {

    const [list, setList] = useState([])
 
    useEffect( () => {
        
        const getSubscribers = async () => {

            console.log("getSubscribers")
            // let response = await fetch(serverPath + '/api/subscribers');
            let response = await fetch(`${serverPath}/subscribers`);
            let result = await response.json();

            console.log('Result', result.data)
            setList(result.data);
        }

        getSubscribers();

        
    }, [])

    return (
        <div className={styles.component}>
            <h2>SubscribersList</h2>

            {list.map( (subscriber) => {
                return <SubscriberItem key={subscriber._id} hest={subscriber}></SubscriberItem>
            })}
           
        </div>
    );
};
export default SubscribersList;