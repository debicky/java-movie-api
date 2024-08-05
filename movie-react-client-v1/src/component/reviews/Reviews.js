import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {

    const revText = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, []);

    const addReview = async (e) => {
        e.preventDefault();
        const rev = revText.current;

        if (rev.value.length < 3) {
            setErrorMessage('Review must be at least 3 characters long.');
            return;
        }

        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });

            const updatedReviews = [...reviews || [], { body: rev.value }];

            rev.value = "";
            setErrorMessage('');

            setReviews(updatedReviews);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        reviews?.map((r, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </React.Fragment>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;
