/**
*
* Navigation
*
*/

import React from 'react';
// import styled from 'styled-components';

import H2 from '../../components/H2';
import styles from './styles.css';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import InputRange from 'react-input-range';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-input-range/lib/css/index.css';
 

function Search() {
  return (
    <div>
      <div className={`${styles.mainSectionBoarder}`}>
          <section className={`${styles.textSection}   ${styles.leftAligned}`}>
            <H2 className={`${styles.paddingleft__Header}`}>
              Flight Search Engine
            </H2>
            <hr className={styles.HeadingStripe} />
          </section>
          <div className={styles.MainContent}>
      </div>
    </div>
    </div>
  );
}

Search.propTypes = {

};

export default Search;
