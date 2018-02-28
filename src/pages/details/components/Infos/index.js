/* Core */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const renderStats = stats => (
  stats.map(item => (
    <div
      key={item.base_stat}
      className="stats-item stats-right"
    >
      {item.base_stat}
    </div>
  ))
);

const renderTypes = types => (
  types.reverse().map(item => (
    <div
      className={`item-box-data ${item.type.name}`}
    >
      {item.type.name}
    </div>
  ))
);

const renderAbilities = abilities => (
  abilities.map(item => (
    <div className="item-box-data item-box-data-ability">{item.ability.name}</div>
  ))
);

const Infos = ({ stats, types, abilities }) => (
  <div className="infosContainer">
    <div className="infosBox">
      <div className="first-box-info">
        <div className="box-row">
          <div className="box-row-title">Types</div>
          <div className="box-row-data">
            {renderTypes(types)}
          </div>
        </div>
        <div className="divider" />
        <div className="box-row">
          <div className="box-row-title">Abilities</div>
          <div className="box-row-data">
            {renderAbilities(abilities)}
          </div>
        </div>
      </div>

      <div className="statsContainer">
        <div className="stats statsLeft">
          <div className="stats-item stats-item-left">HP</div>
          <div className="stats-item stats-item-left">ATK</div>
          <div className="stats-item stats-item-left">DEF</div>
          <div className="stats-item stats-item-left">SP ATK</div>
          <div className="stats-item stats-item-left">SP DEF</div>
          <div className="stats-item stats-item-left">SPEED</div>
        </div>
        <div className="stats">
          {renderStats(stats)}
        </div>
      </div>

      {/* <div className="stats-box-info">
        <div className="box-row">
          <div className="box-row-data-stats">
            <div className="item-box-data-stats alignRight">HP</div>
            <div className="item-box-data-stats alignRight">ATK</div>
            <div className="item-box-data-stats alignRight">DEF</div>
            <div className="item-box-data-stats alignRight">SP ATK</div>
            <div className="item-box-data-stats alignRight">SP DEF</div>
            <div className="item-box-data-stats alignRight">SPEED</div>
          </div>
        </div>
        <div className="divider-stats" />
        <div className="box-row">
          <div className="box-row-data-stats">
            {renderStats(stats)}
          </div>
        </div>
      </div> */}
    </div>

  </div>
);

Infos.propTypes = {
  // types: PropTypes.arrayOf(PropTypes.shape({

  // })
};

export default Infos;
