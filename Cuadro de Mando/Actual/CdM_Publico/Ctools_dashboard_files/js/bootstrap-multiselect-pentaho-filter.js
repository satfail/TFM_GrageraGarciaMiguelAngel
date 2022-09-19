/** Bootstrap Multiselect Pentaho Filter
 * bovbi.com.br
 * @fernandommota Fernando Maia da Mota
 **/

require.config({
  waitSeconds: 100,
  paths: {
    "bootstrap-multiselect-knockout":
      "/pentaho/api/repos/:public:bootstrap-multiselect-pentaho-filter:js:knockout.js/content?noext",
    /* Path example for AppBuilder/Sparkl plugins approach
      "/pentaho/api/repos/dashboard/static/custom/js/libs/bootstrap-multiselect-pentaho-filter/js/knockout.js?noext",
      */
    "bootstrap-multiselect":
      "/pentaho/api/repos/:public:bootstrap-multiselect-pentaho-filter:js:bootstrap-multiselect.js/content?noext",
    /* Path example for AppBuilder/Sparkl plugins approach
      "/pentaho/api/repos/dashboard/static/custom/js/libs/bootstrap-multiselect-pentaho-filter/js/bootstrap-multiselect.js?noext",
      */
    "bootstrap-multiselect-css":
      "/pentaho/api/repos/:public:bootstrap-multiselect-pentaho-filter:css:bootstrap-multiselect.css/content?noext"
    /* Path example for AppBuilder/Sparkl plugins approach
      "/pentaho/api/repos/dashboard/static/custom/js/libs/bootstrap-multiselect-pentaho-filter/css/bootstrap-multiselect.css?noext"
      */
  },
  // start Shim Configuration
  shim: {
    "cdf/lib/jquery": {
      exports: "$"
    },
    "bootstrap-multiselect-knockout": {
      exports: "ko"
    },
    "cdf/Dashboard.Bootstrap": {
      deps: ["cdf/lib/jquery"]
    },
    "bootstrap-multiselect": {
      deps: [
        "css!bootstrap-multiselect-css",
        "cdf/Dashboard.Bootstrap",
        "cdf/lib/jquery",
        "bootstrap-multiselect-knockout"
      ]
    }
  } // end Shim Configuration
});

define(["cdf/lib/jquery", "bootstrap-multiselect"], function($) {
  const postExecutionSelect = function postExecutionSelect(
    optionAllValue,
    filterPlaceholder,
    nonSelectedText,
    allSelectedText,
    nSelectedText
  ) {
    $("#" + this.htmlObject + " select").multiselect({
      includeSelectAllOption: true,
      selectAllValue: optionAllValue,
      enableFiltering: true,
      filterPlaceholder: filterPlaceholder ? filterPlaceholder : "Buscar",
      enableCaseInsensitiveFiltering: true,
      nonSelectedText: nonSelectedText ? nonSelectedText : "Selecione",
      allSelectedText: allSelectedText ? allSelectedText : "Todos",
      selectAllText: allSelectedText ? allSelectedText : "Todos",
      nSelectedText: nSelectedText ? nSelectedText : " - selecionados",
      numberDisplayed: 1,
      buttonWidth: "100%"
    });

    _parameter = this.dashboard.getParameterValue(this.parameter);
    var nOptions = $("#" + this.htmlObject + " option");

    if (_parameter.length <= 0 || _parameter.length === nOptions.length) {
      $("#" + this.htmlObject + " select").multiselect("selectAll", false);
      this.dashboard.setParameter(this.parameter, optionAllValue);
    } else {
      $("#" + this.htmlObject + " select").multiselect("selectAll", true);
      this.dashboard.setParameter(this.parameter, _parameter);
    }

    //update select
    $("#" + this.htmlObject + " select").multiselect("refresh");
  };

  const preChangeSelect = function preChangeSelect(optionAllValue, newChoice) {
    //get the length options of select
    var nOptions = $("#" + this.htmlObject + " option");

    //test if exist unless on eoption
    if (nOptions.length > 0) {
      //test if the number of options selected is equal to number of options available
      if (nOptions.length === newChoice.length) return optionAllValue;
      else return newChoice;
    }
  };

  const postFetchSelect = function postFetchSelect(result, defaultValueOption) {
    //defaultValueOption options
    // all - will select all options in resultset
    // first - will select the first option in resultset
    // first-n - will select the n firsts options in resultset
    // last - will select the last option in resultset
    // last-n - will select the n last options in resultset

    defaultValueOptionLength =
      defaultValueOption.split("-").length > 1
        ? defaultValueOption.split("-")[1]
        : 0;
    defaultValueOption =
      defaultValueOptionLength > 0
        ? defaultValueOption.split("-")[0].toString()
        : defaultValueOption;

    //get the parameter mapped in component
    _parameter = this.dashboard.getParameterValue(this.parameter);
    if (_parameter.length <= 0) {
      var options = [];
      var resultset = result.resultset;
      if (defaultValueOption === "first") {
        if (defaultValueOptionLength > 0) {
          for (
            var i = 0;
            i < defaultValueOptionLength && i < resultset.length;
            i++
          )
            options.push(resultset[i][0]);
        } else options.push(resultset[0][0]);
      } else if (defaultValueOption === "last") {
        if (defaultValueOptionLength > 0) {
          for (
            var i = resultset.length - 1;
            i > resultset.length - 1 - defaultValueOptionLength && i >= 0;
            i--
          )
            options.push(resultset[i][0]);
        } else options.push(resultset[resultset.length - 1][0]);
      } else {
        // all option or none selected
        $.each(result.resultset, function(index, value) {
          options.push(value[0]);
        });
      }

      this.dashboard.setParameter(this.parameter, options);
    } else {
      this.dashboard.setParameter(this.parameter, _parameter);
    }
  };

  return {
    postExecutionSelect: postExecutionSelect,
    preChangeSelect: preChangeSelect,
    postFetchSelect: postFetchSelect
  };
});
