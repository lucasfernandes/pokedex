/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import SearchByTypeActions from 'store/ducks/searchByType';
import LoaderActions from 'store/ducks/loader';

/* Presentational */
import './styles.css';

const renderStats = stats => (
  stats.reverse().map(item => (
    <div
      key={item.base_stat}
      className="stats-item stats-right"
    >
      {item.base_stat}
    </div>
  ))
);

const renderTypeClick = (searchByTypeRequest, typeName, loaderLoadingOn) => {
  loaderLoadingOn();
  searchByTypeRequest(typeName);
};

const renderTypes = (types, searchByTypeRequest, loaderLoadingOn) => (
  types.map(item => (
    <div
      className={`item-box-data ${item.type.name}`}
    >
      <button
        className="item-box-data-type-button"
        onClick={() => renderTypeClick(searchByTypeRequest, item.type.name, loaderLoadingOn)}
      >
        {item.type.name}
      </button>
    </div>
  ))
);

const renderAbilities = (abilities, shortEffects) => (
  abilities.map((item, index) => (
    <div className="item-box-data">
      <button
        className="item-box-data-type-button"
        onClick={() => alert(shortEffects[index].effect_entries[0].short_effect)}
      >
        {item.ability.name}
      </button>
    </div>
  ))
);

const Infos = ({ stats, types, abilities, short_effects, searchByTypeRequest, loaderLoadingOn }) => (
  <div className="infosContainer">
    <div className="infosBox">
      <div className="first-box-info">
        <div className="box-row">
          <div className="box-row-title">Types</div>
          <div className="box-row-data">
            {renderTypes(types, searchByTypeRequest, loaderLoadingOn)}
          </div>
        </div>
        <div className="divider" />
        <div className="box-row">
          <div className="box-row-title">Abilities</div>
          <div className="box-row-data">
            {renderAbilities(abilities, short_effects)}
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

const mapDispatchToProps = dispatch => ({
  searchByTypeRequest: typeName => dispatch(SearchByTypeActions.searchByTypeRequest(typeName)),
  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
});

export default connect(null, mapDispatchToProps)(Infos);
