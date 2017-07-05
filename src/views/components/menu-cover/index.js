import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UxMenuButton from '../../components/ux-menu-button';
import Acquisition from '../../../assets/img/acquisition.svg';
import Async from 'react-promise'
import './style.css';

// this is a cool anti pattern a big fat statefull function in redux app (god please forgive me)
function returnTheCorrespendingModel(profiles, profile) {
  return profiles.find((prof) => prof.id === profile.selectedProfile)
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function returnViews(item, index, module) {
  return (        
    <div className="row" key={index}>
      <div className="col-md-3 text-center" style={{marginTop: '40px'}}>
        <div className="row">
          <Async promise={import(`../../../assets/img/${item.id}.svg`)} then={(model => <img src={model} alt="" style={{width: '63px'}}/>)}/>
        </div>
        <div className="row">
          <p style={{fontSize: '19px'}}>{capitalizeFirstLetter(item.id)}</p>
        </div>
      </div>
      {item.tabs.map((tab, index) => {
        return (
          <div className="col-md-3 text-center" key={index}>
            <UxMenuButton>{tab.id}</UxMenuButton>
          </div>
        );
      })}
    </div>
  );
}

const MenuCover = ({layout: {layout: {model: {profiles}}}, profile}) => {
  let { views } = returnTheCorrespendingModel(profiles, profile);
  return (
    <div>
      <div className="ux-main-menu center-block">
        <div className="menu-cover"></div>
        {views.map((item, index) => returnViews(item, index))}
      </div>
    </div>
  );
};

MenuCover.propTypes = {
  layout: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps,
  null
)(MenuCover);