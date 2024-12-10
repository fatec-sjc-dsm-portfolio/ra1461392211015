import './style.css'
import LoadingIcon from '../../assets/loading.gif'

const Loading = () => {
    return (
        <div className='loading-container'>
            <img src={LoadingIcon} alt='Loading' />
        </div>
    );
};

export default Loading;