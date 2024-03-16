import { Card, List, Modal, Rate, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { GetReviewsByBookId } from "../../../api/reviews";
import moment from "moment";

const ReviewModal = ({ open = false, setOpen, selectedBook }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getReview = async () => {
    try {
      dispatch(ShowLoading());
      setLoading(true);
      const reviewResponse = await GetReviewsByBookId(selectedBook._id);
      if (reviewResponse) {
        setReviews(reviewResponse.data);
        setLoading(false);
        dispatch(HideLoading());
      } else {
        message.error(reviewResponse.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  return (
    <>
      <Modal
        title={`Reviews of book - ${selectedBook.title}`}
        open={open}
        onCancel={() => setOpen(false)}
        width={1200}
        footer={null}
      >
        <div className="reviewCards">
          <List
            loading={loading}
            dataSource={reviews}
            grid={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
            renderItem={(item) => {
              return (
                <Card
                  title={item?.user?.name}
                  className="m-1 reviewCard"
                  extra={<Rate disabled defaultValue={item?.rating} />}
                >
                  <p className="text-sm">{item?.comment}</p>
                  <span className="text-sm reviewDate">
                    {moment(item?.createdAt).format("DD-MM-YYYY")}
                  </span>
                </Card>
              );
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default ReviewModal;
