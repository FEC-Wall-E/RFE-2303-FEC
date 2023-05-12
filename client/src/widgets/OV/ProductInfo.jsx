import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StarRatings from "react-star-ratings";

function ProductInfo({currentProduct, currentStyle, checkIfProductChangedArr, checkIfStyleChangedArr, allRatingsObj}) {

  const [currentPrice, setCurrentPrice] = useState(currentProduct.default_price)
  const [hasSale, setHasSale] = useState(false)


  useEffect(()=>{setCurrentPrice(currentProduct.default_price)}, checkIfProductChangedArr)
  useEffect(()=>{ if (currentStyle.sale_price) {setHasSale(true); setCurrentPrice(currentStyle.sale_price)} else {setCurrentPrice(currentStyle.original_price); setHasSale(false)}}, checkIfStyleChangedArr)


  if (allRatingsObj) {
    var ratingsArr = Object.entries(allRatingsObj)

    // oh my god this has got to be the LEAST efficient way to do this
    // ... well, it works for now soooooo
    var oneStar = Number(ratingsArr[0][0]) * Number(ratingsArr[0][1])
    var twoStar = Number(ratingsArr[1][0]) * Number(ratingsArr[1][1])
    var threeStar = Number(ratingsArr[2][0]) * Number(ratingsArr[2][1])
    var fourStar = Number(ratingsArr[3][0]) * Number(ratingsArr[3][1])
    var fiveStar = Number(ratingsArr[4][0]) * Number(ratingsArr[4][1])
    var divider = Number(ratingsArr[0][1]) + Number(ratingsArr[1][1]) + Number(ratingsArr[2][1]) + Number(ratingsArr[3][1]) + Number(ratingsArr[4][1])
    var total = oneStar + twoStar + threeStar + fourStar + fiveStar
    var averageRating = total / divider;
    var oldDecimals = Number(averageRating.toString()[2] + averageRating.toString()[3])
    var newDecimals;
    if (oldDecimals >= 0 && oldDecimals <= 13) {
      newDecimals = 0;
    } else if (oldDecimals > 13 && oldDecimals <= 38) {
      newDecimals = 25;
    } else if (oldDecimals > 38 && oldDecimals <= 62) {
      newDecimals = 50;
    } else if (oldDecimals > 62 && oldDecimals <= 87) {
      newDecimals = 75;
    } else if (oldDecimals > 87 && oldDecimals <= 99) {
      newDecimals = 0;
    }
    var averageRatingRounded = Number(averageRating.toString()[0] + '.' + newDecimals.toString())


    return (
      <div>
        <div style={{'display': 'flex', 'flexDirection': 'column'}}>
        <StarRatings
            name="average-rating"
            editing='false'
            starCount={5}
            rating={averageRatingRounded}
            starRatedColor="blue"
            starSpacing="10px"
          />
          <p onClick={(e)=>{e.preventDefault; console.log('average: ', averageRating, ' rounded: ', averageRatingRounded)}}>read all reviews</p>
        </div>
        <p className="product-category">{currentProduct.category}</p>
        <h3 className="product-name">{currentProduct.name}</h3>
        <p>{currentProduct.slogan}</p>
        {hasSale ? <div><strike >{currentStyle.original_price}</strike> <p style={{'color': 'red'}}>{currentPrice}</p></div> : <p>{currentPrice}</p>}
        <div className="product-description">{currentProduct.description}</div>
      </div>
    )
  } else {
    return (
      <div>
        Loading...
      </div>
    )
  }

}

export default ProductInfo;
