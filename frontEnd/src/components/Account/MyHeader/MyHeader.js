import React, { Component } from 'react';
import classes from './MyHeader.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from '../../../axios-config';
import AWS from 'aws-sdk';
import * as actions from '../../../store/actions/index';
class myheader extends Component{
    componentDidMount(){
        if(this.props.history.location.hash == "#settings"){
            $("#nav-settings-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#shoppingcart"){
            $("#nav-shoppingCart-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#order"){
            $("#nav-myOrder-tab").trigger("click");
            this.props.history.push("/myprofile");
        }
        else if(this.props.history.location.hash == "#myrecipe"){
            $("#nav-myRecipes-tab").trigger("click");
            this.props.history.push("/myprofile");
        }
    }
    componentWillReceiveProps(){
        if(this.props.history.location.hash == "#settings"){
            $("#nav-settings-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#shoppingcart"){
            $("#nav-shoppingCart-tab").trigger("click");
            this.props.history.push ("/myprofile");
        }
        else if(this.props.history.location.hash == "#order"){
            $("#nav-myOrder-tab").trigger("click");
            this.props.history.push("/myprofile");
        }
        else if(this.props.history.location.hash == "#myrecipe"){
            $("#nav-myRecipes-tab").trigger("click");
            this.props.history.push("/myprofile");
        }
    }
    updateImgDB = (imgUrl)=>{
        const postData = {
            userId: this.props.userId,
            token: this.props.token,
            img: imgUrl
        };
        Axios.post('/settings/update/userIcon', postData).then(response=>{
            this.props.setAlert(response.data, false);
        }).catch(error=>{
            this.props.setAlert("Connection Failed", true);
        });
    }
    addPhoto = () => {
        // this.updateImgDB("https://uploadimgstore.s3.amazonaws.com/touxiang.jpg");
        var albumBucketName = 'uploadimgstore';
        var bucketRegion = 'us-east-1';
        var IdentityPoolId = 'us-east-1:e474abd9-e1ae-4f71-ab8e-1c781aa6c075';
        
        AWS.config.update({
          region: bucketRegion,
          credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
          })
        });
        
        var s3 = new AWS.S3({
          apiVersion: '2006-03-01',
          params: {Bucket: albumBucketName}
        });
        let files = document.getElementById('uploadImg').files;
        if (!files.length) {
          return alert('Please choose a file to upload first.');
        }
        let file = files[0];
        let fileName = file.name;
        let albumPhotosKey = "";
        let photoKey = albumPhotosKey + fileName;
        let params=  {Bucket: albumBucketName, Key: photoKey, Body: file};
        s3.upload(params, (err, data)=>{
            if(err){
                alert("Fail to upload img");
                this.props.setAlert("Fail to upload, try another Img", true);
                // console.log(err);
                return ;
            }
            else{
                // console.log(data);
                this.updateImgDB(data.Location);
                this.props.updateUserIcon(data.Location);
                return ;
            }
        });
      }
    uploadImg = () => {
        $('#uploadImg').trigger('click');
    }
    imgOnChange = (e) => {
        const file = this.refs.uploadImg.files[0];
        const reader = new FileReader();
        this.addPhoto();
        reader.onloadend = () => {
            this.setState({img: reader.result})
        };
        if(file){
            reader.readAsDataURL(file);
            this.setState({img: reader.result});
        }
        else{
            this.setState({img:"http://via.placeholder.com/600x400"});
        }
    }
    render(){
        let navItem = ["nav", "nav-tabs",classes.profileNav];
        return (
            <div>
                <div className={classes.headerImg}>
                    <div className={classes.introBox}>
                        <img className={classes.imgIcon} src={this.props.img} onClick={this.uploadImg}/>
                        <input type="file" ref="uploadImg" name="selectedFile" onChange={this.imgOnChange} id="uploadImg" style={{display:"none"}}/>
                        <div className={classes.introText}>
                            <p><strong>{this.props.username}</strong></p>
                            <p>Manage and check my profile. :D</p>
                        </div>
                    </div>    
                </div>
                <nav>
                    <div className={navItem.join(" ")} id="nav-tab" role="tablist">
                        <a className="nav-item nav-link accountHeader active" 
                            id="nav-myOrder-tab" 
                            data-toggle="tab" 
                            href="#nav-myOrder" 
                            role="tab" 
                            aria-controls="nav-myOrder" 
                            aria-selected="true">
                            <i className="fas fa-home" style={{color:"#00c091"}}></i>My Orders</a>
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-shoppingCart-tab" 
                            data-toggle="tab" 
                            href="#nav-shoppingCart" 
                            role="tab" 
                            aria-controls="nav-shoppingCart" 
                            aria-selected="false">
                            <i className="fas fa-shopping-cart" style={{color:"#02b5da"}}></i>Shopping Cart</a>
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-myRecipes-tab" 
                            data-toggle="tab" 
                            href="#nav-myRecipes" 
                            role="tab" 
                            aria-controls="nav-myRecipes" 
                            aria-selected="false">
                            <i className="fas fa-utensils" style={{color:"#ff5d47"}}></i>My Recipes</a>
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-favoriteList-tab" 
                            data-toggle="tab" 
                            href="#nav-favoriteList" 
                            role="tab" 
                            aria-controls="nav-favoriteList" 
                            aria-selected="false">
                            <i className="fas fa-star" style={{color:"#fb7299"}}></i>My Favorites</a>
                        <a className="nav-item nav-link accountHeader" 
                            id="nav-settings-tab" 
                            data-toggle="tab" 
                            href="#nav-settings" 
                            role="tab" 
                            aria-controls="nav-settings" 
                            aria-selected="false">
                            <i className="fas fa-cog" style={{color:"#f3a034"}}></i>Settings</a>
                    </div>
                    <br/>
                </nav>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        username: state.auth.username,
        img: state.auth.img
    }
}
const mapDispatchToProps = dispatch => {
    return{
        setAlert: (error, isError) => dispatch(actions.setAlert(error, isError)),
        updateUserIcon: (imgUrl) => dispatch(actions.updateUserIcon(imgUrl))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(myheader));