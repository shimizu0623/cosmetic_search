// MEMO: スタイル調整済
import React, {useState, useEffect} from 'react';
import axios from '../axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import leaf_menu_img from '../img/leaf_menu_img.jpg';
import leaf_favorite_img from '../img/leaf_favorite_img.jpg';
import leaf_history_img from '../img/leaf_history_img.jpg';
import normal_skin_img from '../img/normal_skin_img.jpg';
import innerDry_skin_img from '../img/innerDry_skin_img.jpg';
import dry_skin_img from '../img/dry_skin_img.jpg';
import oily_skin_img from '../img/oily_skin_img.jpg';
import combination_skin_img from '../img/combination_skin_img.jpg';
import sensitive_skin_img from '../img/sensitive_skin_img.jpg';
import header_img from '../img/headerMyPage.jpg';
import { GoBackBtn } from '../components/goBackBtn';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const useStyles = makeStyles({
    menu: {
        fontSize: '23px',
        color: 'white',
        listStyle: 'none',
        width: '200px',
        lineHeight: '200px',
        borderRadius: '50%',
        background: '#4dc9b2c9',
        margin: '4px',
        display: 'inline-block',
        underline: 'none',
        '&:hover':{
            background: '#4dc9b27d',          
        }
    },
    img: {
        maxWidth: '250px',
        margin: '90px auto 0',
    },
    header: {
        width: '100%',
    },
    // rightArrow: {
    //     maxWidth: '50px',
    //     margin: 'auto 0 auto auto',
    //     '&:hover':{
    //         cursor: 'pointer',
    //         opacity: '0.6',
    //     }
    // },
    // leftArrow: {
    //     maxWidth: '50px',
    //     margin: 'auto  auto auto 0',
    //     '&:hover':{
    //         cursor: 'pointer',
    //         opacity: '0.6',
    //     }
    // },
    skinTypeForm: {
        margin: '0 auto',
    },
    skinPaper: {
        backgroundSize: "90px auto",
        margin: '0 20px 10px',
        '&:hover':{
            cursor: 'pointer',
            opacity: '0.6',        
        }
    },
    p: {
        color: '#0c5b64',
        fontSize: '18px',
        fontWeight: 'bold',
        // textAlign:'center',
        // height:'90px',
        lineHeight:'90px',
        textShadow: '0 -1px 0 #cdeef1',
    },
    cardPaper: {
        '&:hover':{
            cursor: 'pointer', 
            opacity: '0.6',         
        }
    },
    styleParent: {
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 0 0 0',
    },
});


export const MyPage = () => {
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [histories, setHistories] = useState([]);

    useEffect(async () => {
        const response = await axios.get('/me');
        const responseFavorites = await axios.get('/user_favorites');
        const responseHistories = await axios.get('/user_histories');
        const u = response.data;
        const f = responseFavorites.data;
        const h = responseHistories.data;
        setUser(u);
        setFavorites(f);
        setHistories(h);
    }, []);

    const userInformation = () => {
        if (user === null){
            return <CircularProgress color="success" size="35px" />
        }
        return(
            <div style={{ margin: 'auto 0', width: '400px' }}>
                <p style={{ fontSize: '30px', marginBottom: '15px' }}>{user.name}</p>
                <p>{user.birthday_string}/{user.gender_name}</p>
                <p>{user.skin_type_name}</p>
            </div>
        );
    };

    const updateSkinType = async (skinTypeId) => {
        try {
            const response = await axios.post('/me', {...user, skin_type_id: skinTypeId});
            console.log(response);
            window.alert('スキンタイプを変更しました');
            console.log(user);
            const u = response.data;
            setUser(u);
        } catch (e) {
            window.alert('変更できませんでした');
            console.error(e);
            return;
        };
    };

    const handleNormalSkin = () => {
        updateSkinType(1);
    };

    const handleInnerDrySkin = () => {
        updateSkinType(2);
    };

    const handleDrySkin = () => {
        updateSkinType(3);
    };
    
    const handleOilySkin = () => {
        updateSkinType(4);
    };

    const handleCombinationSkin = () => {
        updateSkinType(5);
    };

    const handleSensitiveSkin = () => {
        updateSkinType(6);
    };

    return(
        <>
        <div className='MainContainer'>
            <GoBackBtn />
            <img src={header_img} alt="header" className={classes.header}/>
            
            <div className={classes.styleParent}>

                {userInformation()}
                
                <div className={classes.skinTypeForm}>
                    <p style={{ marginBottom: '20px' }}>＜自分のスキンタイプを変更する＞</p>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            margin: '0 auto',
                            '& > :not(style)': {
                            width: 90,
                            height: 90,
                            },
                        }}
                    >
                        {/* TODO: ↓の処理ひとつにまとめる */}
                        <Paper 
                            className={classes.skinPaper}
                            onClick={handleNormalSkin} 
                            style={{
                                borderRadius: '50%', 
                                backgroundImage: `url(${normal_skin_img})`
                            }}
                        >
                            <p className={classes.p}>Normal</p>
                        </Paper>
                        <Paper 
                            className={classes.skinPaper}
                            onClick={handleInnerDrySkin} 
                            style={{
                                borderRadius: '50%', 
                                backgroundImage: `url(${innerDry_skin_img})`
                            }}
                        >
                            <p className={classes.p}>InnerDry</p>
                        </Paper>
                        <Paper 
                            className={classes.skinPaper}
                            onClick={handleDrySkin} 
                            style={{
                                borderRadius: '50%', 
                                backgroundImage: `url(${dry_skin_img})`
                            }}
                        >
                            <p className={classes.p}>Dry</p>
                        </Paper>
                        <Paper 
                            className={classes.skinPaper}
                            onClick={handleOilySkin} 
                            style={{
                                borderRadius: '50%', 
                                backgroundImage: `url(${oily_skin_img})`
                            }}
                        >
                            <p className={classes.p}>Oily</p>
                        </Paper>
                        <Paper 
                            className={classes.skinPaper}
                            onClick={handleCombinationSkin}  
                            style={{
                                borderRadius: '50%', 
                                backgroundImage: `url(${combination_skin_img})`
                            }}
                        >
                            <p className={classes.p}>Combination</p>
                        </Paper>
                        <Paper 
                            className={classes.skinPaper} 
                            onClick={handleSensitiveSkin}
                            style={{
                                borderRadius: '50%', 
                                backgroundImage: `url(${sensitive_skin_img})`
                            }}
                        >
                            <p className={classes.p}>Sensitive</p>
                        </Paper>
                    </Box>              
                </div>
            </div>

{/* favorite */}
            <div className='favorite'>
                <img src={leaf_favorite_img} alt="leaf_favorite_img" className={classes.img}/>                
                <ImageList style={{ width: '100%', gridTemplateColumns: 'repeat(1, 1fr)' }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">お気に入りに登録中のアイテム</ListSubheader>
                    </ImageListItem>

                    {/* TODO: 表示されない */}

                    <div style={{ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                        <div style={{ maxWidth: '1000px' }}>
                            <Carousel
                                showDots={true}
                                responsive={responsive}
                                infinite={true}
                                autoPlaySpeed={1000}
                                autoPlay={false}
                                keyBoardControl={true}
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                                shouldResetAutoplay={false}
                            >
                                {favorites.map((favorite) => (
                                    <div style={{ maxWidth: '90%' }}>
                                        <ImageListItem key={favorite.img} className={classes.cardPaper}>
                                            <img
                                                src={favorite.img}
                                                alt={favorite.name}
                                                loading="lazy"
                                                style={{ maxWidth: '100%', height: '100%', margin: '0 auto' }}
                                            />
                                            <ImageListItemBar
                                                title={favorite.brand}
                                                subtitle={favorite.name}
                                            />
                                        </ImageListItem>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>

                    {/* <Grid container spacing={1} direction="row" alignItems="center" style={{ gridTemplateColumns: '1, 1fr', gap: '1' }}>
                        <img src={leftArrow_img} className={classes.leftArrow} onClick={handleLeft} />
                        {favorites.map((favorite) => (
                        <Grid m={1}>
                            <ImageListItem key={favorite.img} className={classes.cardPaper}>
                            <img
                                src={favorite.img}
                                alt={favorite.name}
                                loading="lazy"
                                style={{ maxWidth: '300px', height: '100%', margin: '0 auto' }}
                            />
                            <ImageListItemBar
                                title={favorite.brand}
                                subtitle={favorite.name}
                            />
                            </ImageListItem>
                        </Grid>
                        ))}
                        <img src={rightArrow_img} className={classes.rightArrow} onClick={handleRight} />
                    </Grid> */}

                </ImageList>
            </div>
            
{/* history */}
            <div className='history'>
                <img src={leaf_history_img} alt="leaf_history_img" className={classes.img}/>             
                <ImageList style={{ width: '100%', gridTemplateColumns: 'repeat(1, 1fr)' }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">最近チェックしたアイテム</ListSubheader>
                    </ImageListItem>

                    <div style={{ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
                        <div style={{ maxWidth: '1000px' }}>
                            <Carousel
                                showDots={true}
                                responsive={responsive}
                                infinite={true}
                                autoPlaySpeed={1000}
                                autoPlay={false}
                                keyBoardControl={true}
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px"
                                shouldResetAutoplay={false}
                            >
                                {histories.map((history) => (
                                    <div style={{ maxWidth: '90%' }}>
                                        <ImageListItem key={history.img} className={classes.cardPaper}>
                                            <img
                                                src={history.img}
                                                alt={history.name}
                                                loading="lazy"
                                                style={{ maxWidth: '100%', height: '100%', margin: '0 auto' }}
                                            />
                                            <ImageListItemBar
                                                title={history.brand}
                                                subtitle={history.name}
                                            />
                                        </ImageListItem>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                    
                    {/* <Grid container spacing={1} direction="row" alignItems="center" style={{ gridTemplateColumns: '1, 1fr', gap: '1' }}>
                        <img src={leftArrow_img} className={classes.leftArrow} onClick={handleLeft} /> */}
                        {/* {histories.map((history) => (
                        // <Grid m={1}>
                            <div style={{ maxWidth: '100px' }}>
                                <ImageListItem key={history.img} className={classes.cardPaper}>
                                <img
                                    src={history.img}
                                    alt={history.name}
                                    loading="lazy"
                                    style={{ maxWidth: '100px', height: '100%', margin: '0 auto' }}
                                />
                                <ImageListItemBar
                                    title={history.brand}
                                    subtitle={history.name}
                                />
                                </ImageListItem>
                            </div>
                        // </Grid>
                        ))} */}
                        {/* <img src={rightArrow_img} className={classes.rightArrow} onClick={handleRight} />
                    </Grid> */}

                </ImageList>
            </div>
            
{/* menu */}
            <div className='menu'>
                <img src={leaf_menu_img} alt="leaf_menu_img" className={classes.img}/>
                <div>
                    <Link 
                        className={classes.menu}
                        underline="none"
                        component={RouterLink} 
                        to='/fixAccount'                
                    >
                        お客様情報変更
                    </Link>
                    <Link 
                        className={classes.menu}
                        underline="none"
                        component={RouterLink} 
                        to='/requestPage'
                    >
                        リクエスト
                    </Link>
                    <Link 
                        className={classes.menu}
                        underline="none"
                        component={RouterLink} 
                        to='/confirm'
                    >
                        退会
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
};
