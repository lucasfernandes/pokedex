/* Core */
import React from 'react';
import PropTypes from 'prop-types';

/* Redux */
import { connect } from 'react-redux';
import SearchByTypeActions from 'store/ducks/searchByType';
import LoaderActions from 'store/ducks/loader';

/* Presentational */
import { notify } from 'react-notify-toast';
import './styles.css';

const renderStats = stats => (
  stats.reverse().map(item => (
    <div
      key={`${item.base_stat}-${item.stat.name}`}
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
      key={item.type.name}
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
    <div key={item.ability.name} className="item-box-data">
      <button
        className="item-box-data-type-button"
        onClick={() => notify.show(shortEffects[index].effect_entries[0].short_effect)}
      >
        {item.ability.name}
      </button>
    </div>
  ))
);

const Infos = ({
  stats,
  types,
  abilities,
  short_effects: shortEffects,
  searchByTypeRequest,
  loaderLoadingOn,
}) => (
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
            {renderAbilities(abilities, shortEffects)}
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
    </div>

  </div>
);

Infos.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    base_name: PropTypes.string,
    stat: PropTypes.shape({ name: PropTypes.string }),
  })).isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.shape({ name: PropTypes.string }),
  })).isRequired,
  abilities: PropTypes.arrayOf(PropTypes.shape({
    ability: PropTypes.shape({ name: PropTypes.string }),
  })).isRequired,
  short_effects: PropTypes.arrayOf(PropTypes.shape({
    effect_entries: PropTypes.arrayOf(PropTypes.shape({ short_effect: PropTypes.string })),
  })).isRequired,

  searchByTypeRequest: PropTypes.func.isRequired,
  loaderLoadingOn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  searchByTypeRequest: typeName => dispatch(SearchByTypeActions.searchByTypeRequest(typeName)),
  loaderLoadingOn: () => dispatch(LoaderActions.loaderLoadingOn()),
});

export default connect(null, mapDispatchToProps)(Infos);
