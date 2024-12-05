import SubscribersList from '../../components/Subscribers/SubscribersList';
import page from '../../styles/modules/page/page.module.css';

const SubscribersPage = () => {

    let pageStyles = `${page.wrapper}`;

    return (
        <div className={pageStyles}>
            <div>
                <SubscribersList></SubscribersList>
            </div>
        </div>
    );
};
export default SubscribersPage;