import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as colors from '../../colors';
import Slider from '@material-ui/core/Slider';

function RoommateAcctPage(props) {

    const username = props.clickedUser;
    const pic_url = "profile_pic_"+ props.clickedUser + ".svg";
    const houseName = props.houseName;

    const houseNameBox = {
        backgroundColor: colors.green,
        marginLeft: "35%",
        marginRight: "35%",
        position: "relative", 
        bottom: 20
    };

    const bodyBox = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    const peevesBox = {
        backgroundColor: colors.light3,
        marginLeft: "25%",
        marginRight: "25%",
        padding: "2%"
    };

    const marks = [
        {
          value: 0,
          label: '1',
        },
        {
          value: 10,
          label: '2',
        },
        {
          value: 20,
          label: '3',
        },
        {
          value: 30,
          label: '4',
        },
        {
          value: 40,
          label: '5',
        },
        {
          value: 50,
          label: '6',
        },
        {
          value: 60,
          label: '7',
        },
        {
          value: 70,
          label: '8',
        },
        {
          value: 80,
          label: '9',
        },
        {
          value: 90,
          label: '10',
        },
      ];
      
      function valuetext(value) {
        return `${value}°C`;
      }
      
      function valueLabelFormat(value) {
        return marks.findIndex((mark) => mark.value === value) + 1;
      }

    // function changeBg() {
    //     props.setBgColor(colors.red)
    //     console.log("red");
    // }

    return(
        <div>
            {props.setPageHeader(2)}
            <img src={pic_url} alt={username + "'s profile picture"} style={{display: "block", marginLeft: "44%", marginRight: "50%", width: "12%", paddingTop: 50}}></img> 
            <h1 style={{color: colors.light3, display: "block", textAlign: "center", fontSize: 40, marginTop: 0}}>{username}</h1>
            <div style={bodyBox}>
                
                <div style={houseNameBox}>
                    <h2 style={{textAlign: "center"}}>Member of {houseName}</h2>
                </div>
                <div>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "15%", width: "10%", display: "inline"}}>Messy</text>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "58%", marginRight: 20, display: "inline"}}>Tidy</text>
                    <Slider
                        style={{marginLeft: "15%", width: "72%"}}
                        defaultValue={20}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-restrict"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </div>
                <div style={{paddingTop: 30, paddingBottom: 30}}>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "15%", width: "10%", display: "inline"}}>Quiet</text>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "58%", marginRight: 20, display: "inline"}}>Loud</text>
                    <Slider
                        style={{marginLeft: "15%", width: "72%"}}
                        defaultValue={20}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-restrict"
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </div>
                <div>
                    <text style={{fontSize: 20, marginLeft: "46%"}}>Pet Peeves</text>
                    <div style={peevesBox}>
                        <text> test </text>
                    </div>
                </div>


            </div>
            
        </div>
    );

}

export default RoommateAcctPage;