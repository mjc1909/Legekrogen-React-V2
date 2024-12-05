import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { serverPath } from "../../services/settings";
import SubcribersForm from "./SubcribersForm/SubcribersForm";

const SubscriberView = () => {


    const params = useParams();

    const [subscriber, setSubscriber] = useState([])
    
    useEffect( () => {

        const getSubscriber = async () => {

            const response = await fetch(`${serverPath}/subscriber?id=${params.id}`);
            const result = await response.json();

            if(subscriber)
            {
                setSubscriber(result.data)
            }
           
        }


        getSubscriber();

    }, [params.id])


    // useEffect( () => {

    //     console.log('PARAMS', params.id)

    //     const getSubscribers = async () => {

    //         const response = await fetch(`${serverPath}/subscribers`);
    //         const result = await response.json();

    //         let subscriber = result.data.find((item) => item._id === params.id)

    //         if(subscriber)
    //         {
    //             setSubscriber(subscriber)
    //         }
        
    //     }


    //     getSubscribers();

    // }, [params.id])


    return (
        <div>
            <h1>{subscriber.name}</h1>
            <p>{subscriber.email}</p>

            <SubcribersForm subId={params.id}></SubcribersForm>
        </div>
    );
};
export default SubscriberView;