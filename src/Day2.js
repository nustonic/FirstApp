
import React, { useState, useEffect } from "react";



//Functional Counter Component, 
const FunctionalCounter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `Func Update ${count}`
  })

  return (
    <div className="counter">
      <h2> This is FunctionalCounter</h2>
      <p>Amount: {count}</p>
      <button className="add-btn" onClick={() => {
        setCount(count + 1);
      }}
      >Add</button>
      <button className="del-btn" onClick={() => {
        setCount(count - 1);
      }}
      >Reduce</button>
    </div>
  );
}
// Class Component
class ClassCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 5 };
  }

  componentDidUpdate() {
    document.title = `jumnuan :${this.state.count}`;
  }
  render() {
    return (
      <div className="counter">
        <h2> This is ClassCounter</h2>
        <p>Amount: {this.state.count}</p>
        <button className="add-btn" onClick={() => {
          this.setState({
            count: this.state.count + 5,
          });
        }}>Add</button>

        <button className="del-btn" onClick={() => {
          this.setState({
            count: this.state.count - 2,
          });
        }}>Reduce</button>
      </div>
    );
  }
}

const Blogpost = (props) => {
  const [Like, setLike] = useState(0)
  return (
    // 
    <div>
      <h1>{props.title}</h1>
      <p id="pbox">{props.content}</p>
      <hr></hr><img width={600} height={300} src="https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img,w_1200/https://laotiantimes.com/wp-content/uploads/2024/09/kip.jpg"></img>

      <button
        className="btn-like"
        onClick={() => {
          setLike(Like + 1);
        }}>
        <img id="like" width={50} height={50} src="https://th.bing.com/th/id/OIP.6_2UnvFWUc8m5eZDBue2KgHaHa?rs=1&pid=ImgDetMain"></img>
        <p id="pred"> {Like}</p></button>
    </div>
  )
}
// const styles={
//   BlogpostBtn:{
//     display:'flex'
//   }
// }

const ProductComp = (props) => {
  const [Like, setLike] = useState(0)
  return (
    <div class="grid-container">
      <div class="grid-item">
        <div className="product-cart">
          {/* {props.productDetail.length} */}
          <p>No:{props.index}</p>
          <img className="img-main-product" src={props.productImg}></img>
          <h1>{props.protitle}</h1>
          <p>{props.prodescrip}</p>
          <p>{props.proprice}</p>
          <button
            className="btn-like"
            onClick={() => {
              setLike(Like + 1);
            }}>
            <img id="like" width={50} height={50} src="https://th.bing.com/th/id/OIP.6_2UnvFWUc8m5eZDBue2KgHaHa?rs=1&pid=ImgDetMain"></img>
            <p id="pred"> {Like}</p></button>
        </div>
      </div>
    </div>
  );
} 

//main component
const Day2 = () => {
  const title = 'Laos Enforces Kip';
  const content = 'There are many tutorials that can teach you how to write a blog postThey can educate you on the mechanics of blogging, what to do, and what not to do.Read through them and you can learn how to craft a perfectly serviceable blog post. Heck, you might even write something that wins you an adoring fan or two.But if you dream bigger, if you want to know how to write a successful, engaging blog post that cuts through the noise and wins you legions of fans, you need something better than a run-of-the-mill tutorial. is content aos Enforces Kip-Only Salary Payments Starting October';
  const protitle = 'River sight seeing';
  const prodescrip = 'Jogging along Mekong';
  const proprice = '100.000 Kip per Night';
  const productImg = 'https://static.wanderon.in/wp-content/uploads/2024/04/vietnam-in-summer.jpg';
  const productDetail=[
    {
      title:'River sight seeing',
      descrption:"Jogging along Mekong",
      img:"https://static.wanderon.in/wp-content/uploads/2024/04/vietnam-in-summer.jpg",
      price:"100.000 Kip per Night",

    },
    {
      title:'Night life style',
      descrption:"yieorurhfurhncehwfuiehfeowfhriuefnjkfneiwfnffnrfnerfrhgnerfnewifngi",
      img:"https://th.bing.com/th/id/OIP.x607E00Xww5YxsmqPFM7eAHaFj?rs=1&pid=ImgDetMain",
      price:"350.000 Kip per Night",

    },
    {
      title:'Culture',
      descrption:"Jogging along Mekong",
      img:"https://www.festivalsherpa.com/wp-content/uploads/2016/06/Bhutan-fest-by-www.idealtravelcreations.com_.jpg",
      price:"100.000 Kip per Night",

    },
    {
      title:'Excusive',
      descrption:"yieorurhfurhncehwfuiehfeowfhriuefnjkfneiwfnffnrfnerfrhgnerfnewifngi",
      img:"https://cs.pikabu.ru/post_img/big/2013/03/06/11/1362591448_868344542.jpg",
      price:"350.000 Kip per Night",

    },
  ]
  return (
    <div className="app">
      <FunctionalCounter></FunctionalCounter>
      <ClassCounter></ClassCounter>

      <hr></hr>
      <p>Create Blog consist as Topic, Posty and Like button</p>
      <hr></hr>
      <Blogpost
        title={title}
        content={content}></Blogpost>
      <hr></hr>
      {productDetail.map((element, index)=>(
      
      
      <ProductComp
        index={index+1}
        protitle={element.title}
        prodescrip={element.descrption}
        proprice={element.price}
        productImg={element.img}
      
      >
      </ProductComp>))}
      <style jsx>
        {`
        .img-main-product{
        width:100%;
       

//         }
//         .grid-container {
//           display: inline-grid;
//           column-gap: 50px;
// }
        .product-cart{
          margin:20px 0;
          padding:20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color:#1062C1;
          color: white;
        }
        .app {
          max-width: 1000px;
          margin: 0 auto;
          padding:20px;
          text-align:center;
        }
        .counter{
          margin:20px 0;
          padding:20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color:#4C957A;
          color: white;

        }
        p{
          font-size: 18px;
      
          
        }
          #pred{
          color:red;
          font-size: 16px;
          font-weight:bold;
          }
        #pbox{
          font-size: 18px;
          padding:10px;
          margin: 0 auto;
          text-align:justify;
        }  
        
        .add-btn{
          padding: 10px  20px;
          margin: 10px;
          font-size:16px;
          background-color: #2596BE;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color: 0.3s;

        }
        .del-btn{
        padding: 10px  20px;
          margin: 10px;
          font-size:16px;
          background-color: red;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color: 0.3s;

        }
          .btn-like{
          padding: 0px
          
          font-size:12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color: 0.3s;
          display:flex;
          background-color: white;
          border: 3px solid #0E5CD1;
          }
          button{
          padding: 10px  20px;
          font-family: Phetsarath OT;
          margin: 1px;
          font-size:16px;
          background-color: #000000;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color: 0.3s;
        `}
      </style>
    </div>
  );
};


export default Day2;
