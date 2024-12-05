import { useEffect, useRef, useState } from "react";
import { serverPath } from "../../../services/settings";
import { useNavigate } from "react-router-dom";

const FormSubmitted = ({subscriber}) => {
    return <div>NY BRUGER OPRETTET - VELKOMMEN {subscriber.name}</div>
}

const SubForm = ({subscriber, handleSubmit, formRef, resetForm}) => {

    const [isChanged, setIsChanged] = useState(false)
    const onChangeHandler = (e) => {



        if(e.target.value === subscriber.name) {

            setIsChanged(false)

        } else {

        
            setIsChanged(true)

        }



        e.target.value === subscriber.name ? setIsChanged(false) : setIsChanged(true)

    
      
    }

    return <form onSubmit={handleSubmit} ref={formRef}>
        <label>Navn:
            <input type="text" name={'name'} placeholder="Indtast Navn" defaultValue={subscriber.name} onChange={onChangeHandler}></input>
        </label>
        
        <label>
            Email:
            <input type="text" name={'email'} placeholder="Indtast Email" defaultValue={subscriber.email}></input>
        </label>
        
        <button type="submit" disabled={!isChanged}>Send</button>
        <button type="reset">Reset</button>
        <button type="button" onClick={resetForm}>Reset Programatisk</button>
    </form>

}

const SubcribersForm = ({subId}) => {

    const formRef = useRef();
    const [subscriber, setSubscriber] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    let navigate = useNavigate();


    let name1 = "A"
    let name2 = "B"

    let exp = name1 === name2 ? "Sand" : "Falsk"
    console.log('EXP', exp)
    


    useEffect( () => {

        console.log('SUB ID', subId)

        if(subId){
            setEditMode(true)

            const getSubscriber = async () => {

                const response = await fetch(`${serverPath}/subscriber?id=${subId}`);
                const result = await response.json();
    
                if(subscriber)
                {
                    setSubscriber(result.data)
                }
               
            }
    
    
            getSubscriber();
        }

    }, [subId])


    const resetForm = () => {


        formRef.current.reset()


    }

    const handleSubmit = async (event) => {

        // Stop med det du plejer
        event.preventDefault();

        // Deconstruct object og træk email og name ud.
        const {email, name} = event.target.elements;
        
        // Opret ny Subscriber
        let newSubscriber = {
            name : name.value,
            email : email.value
        };

        if(editMode) {
            newSubscriber.id = subId;
        }

        // Send Subscriber til serveren
        const response =  await fetch(`${serverPath}/subscriber`, {
            "method" : editMode ? "PUT" : "POST",
            "headers" : {
                "content-type" : "application/json"
            },
            "body" : JSON.stringify(newSubscriber)
        });

        // Modtage resultat fra serveren.
        const result = await response.json();

        setSubmitted(true)
        setSubscriber(result.data);
        // Logge resultat.
        console.log("RESULT", result);

    }

    const onDeleteSubscriber = async () => {

        console.log('onDeleteSubscriber', subId)
        
        // Send Subscriber til serveren
        const response =  await fetch(`${serverPath}/subscriber`, {
            "method" : "DELETE",
            "headers" : {
                "content-type" : "application/json"
            },
            "body" : JSON.stringify({
                "id" : subId
            })
        });

        const result = await response.json();
        console.log('Subscriber Deleted', result)
        navigate("/subscribers")

    }

    return (
        <div>
            {editMode ? 'Rediger Subscriber' : 'Opret Subscriber'}


            <h4>{subscriber.name}</h4>
            {submitted ? <FormSubmitted subscriber={subscriber}></FormSubmitted> : <SubForm subscriber={subscriber} handleSubmit={handleSubmit} formRef={formRef} resetForm={resetForm}></SubForm>}


            {editMode ? <button onClick={onDeleteSubscriber}>DELETE</button> : null}
        </div>
    );
};
export default SubcribersForm;