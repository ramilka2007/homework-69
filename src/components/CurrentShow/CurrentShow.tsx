import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {AppDispatch, RootState} from "../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentShow} from "../../store/showSlice";
import './CurrentShow.css';

const CurrentShow = () => {
    const params = useParams();
    const dispatch: AppDispatch = useDispatch();
    const currentShow = useSelector((state: RootState) => state.show.currentShow);
    console.log(currentShow);

    useEffect(() => {
        if(params.id) {
            dispatch(fetchCurrentShow(params.id))
        }
    }, [dispatch, params.id]);
    return (
        <div className="d-flex mt-5">
            <div className="image w-25">
                <img className="currentImg" src={currentShow.image} alt={currentShow.name}/>
            </div>
            <div className="info w-75 text-start ps-5">
                <h1>{currentShow.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: currentShow.summary }} className="mt-5 fs-3"/>
            </div>
        </div>
    );
};

export default CurrentShow;