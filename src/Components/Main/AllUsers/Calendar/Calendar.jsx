import React from 'react';
import { useSelector } from 'react-redux';
import style from "../../Main.module.css";

const GoogleCalendar = ({calendarLink}) => {
    return (
        <div>
            <iframe
                src={calendarLink}
                style={{ border: 'solid 1px #777' }}
                width="700"
                height="500"
                frameborder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
};

export default GoogleCalendar;
