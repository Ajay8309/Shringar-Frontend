import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <FaChevronLeft className="slick-prev" onClick={onClick} />
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <FaChevronRight className="slick-next" onClick={onClick} />
  );
};

export { PrevArrow, NextArrow };
