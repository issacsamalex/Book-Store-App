import { Modal, Rate, message, ConfigProvider } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { AddReview, UpdateReview } from "../../../api/reviews";

const ReviewForm = ({ book, showReviewForm, setShowReviewForm, reloadData, selectedReview, bookData }) => {

    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const {user} = useSelector(state => state.users)
    const userId = user._id


    const addReview = async () => {
        try {
            dispatch(ShowLoading());
            let response = null;
            if(selectedReview){
                response = await UpdateReview({
                    _id: selectedReview._id,
                    book: bookData._id,
                    user: userId,
                    rating,
                    comment,
                })
            }else {
                response = await AddReview({
                    book: book,
                    user: userId,
                    rating,
                    comment,
                })
            }
            if(response.success){
                message.success(response.message);
                if(selectedReview){
                    reloadData();
                }
                setShowReviewForm(false);
                dispatch(HideLoading());
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };

    useEffect(() => {
        if(selectedReview){
            setRating(selectedReview.rating)
            setComment(selectedReview.comment);
        }
    }, [selectedReview]);

  return (
    <ConfigProvider
    theme={{
        token: {
            colorPrimary: "#3F76A7"
        }
    }}
    >
    <Modal
    centered
    title={selectedReview ? "Update Review" : "Add review"}
    open={showReviewForm}
    onCancel={() => setShowReviewForm(false)}
    onOk={addReview}
    >
        <div className="flex flex-col gap-2">
            <Rate
            value={rating}
            onChange={(value) => setRating(value)}
            allowHalf
            />
            <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            cols="30" rows="10"
            placeholder="Enter your review here"
            >

            </textarea>
        </div>
    </Modal>
    </ConfigProvider>
  );
};

export default ReviewForm;
