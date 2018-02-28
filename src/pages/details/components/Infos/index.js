/* Core */
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const renderStats = stats => (
  <div className="first-box-info">
    HP 60  | Attack 62 | Defense 63
  </div>
);

const renderTypes = types => (
  types.map(item => (
    <div
      className={`item-box-data ${item.type.name}`}
    >
      {item.type.name}
    </div>
  ))
);

const renderAbilities = abilities => (
  abilities.map(item => (
    <div className="item-box-data">{item.ability.name}</div>
  ))
);

const Infos = ({ stats, types, abilities }) => (
  <div className="infosContainer">
    <div className="infosBox">
      {renderStats(stats)}
      <div className="seccond-box-info">
        Speed 60 | Sp Atk 80 | Sp Def 30
      </div>
      <div className="third-box-info">
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
    </div>

  </div>
);

Infos.propTypes = {
  // types: PropTypes.arrayOf(PropTypes.shape({

  // })
};

export default Infos;
