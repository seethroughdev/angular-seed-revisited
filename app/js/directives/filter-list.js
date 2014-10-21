'use strict';

var _           = require('lodash')
,   colorScheme = require('../util/colors-util');

var $ = window.jQuery;


module.exports = /* @ngInject */ function($location, $timeout, $rootScope, $state,
                          STATE, ChartSvc, UrlUtil) {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      filters: '=',
      title: '@'
    },
    template: require('../partials/directives/filter-list.jade'),

    link: function(scope, elem) {
      var active = STATE.ACTIVE_STRING;

      function toggleFiltersActive($el, $li, $this) {
        var $activeLinks = $el.find('ul li.is-active');

        // set up clicking behavior for filters.

        if ($activeLinks.length === $li.length) {
          $this.siblings('li').removeClass(active);
        } else if ($activeLinks.length === 1 && $this.hasClass(active)) {
          $li.addClass(active);
        } else {
          $this.toggleClass(active);
        }
      }

      function removeFiltersLinks(arr, $li) {
        _.each(scope.filters, function(val, i) {
          if (arr.indexOf(val) !== -1) {
            $li.eq(i).removeClass(active);
          } else {
            $li.eq(i).addClass(active);
          }
        });
      }


      // wrapping methods in Wait Service.  Because we
      // don't want it to execute before the chart is loaded

      function hideFilters(arr) {
        ChartSvc.waitForChart(function() {
          return ChartSvc.hideFilters(window.thisChart, arr);
        });
      }

      function showFilters(arr) {
        ChartSvc.waitForChart(function() {
          return ChartSvc.showFilters(window.thisChart, arr);
        });
      }

      function addFocus(arr) {
        ChartSvc.waitForChart(function() {
          return ChartSvc.addFocus(window.thisChart, arr);
        });
      }

      function removeFocus(arr) {
        ChartSvc.waitForChart(function() {
          return ChartSvc.removeFocus(window.thisChart, arr);
        });
      }

      function filtersInit(hide, show, li) {
        showFilters(show);
        hideFilters(hide);
        removeFiltersLinks(hide, li);
      }


      /*==========  WATCH METHOD  ==========*/

      scope.$watch('[filters]', function () {

        var $el = $(elem)
        ,   $li = $el.find('li')
        ,   $span
        , currentLever = $state.current.name.match(/[^.]*/i)[0];

        var allFiltersArr = scope.filters,
            hideFiltersArr = $location.search().filter || [],
            showFiltersArr = _.difference(allFiltersArr, hideFiltersArr);


        /*==========  ADD COLOR BLOCKS TO FILTERS  ==========*/

        $li.each(function(i, val) {
          $span = $('<span>');
          $span
            .addClass('filter__span')
            .css({
              background: colorScheme[currentLever][i],
              border: '1px solid ' + colorScheme[currentLever][i]
            });
          $(val).prepend($span);
        });


        /*==========  CLICK HANDLER  ==========*/

        $li.on('click', function() {
          var $this = $(this);

          showFiltersArr = [];
          hideFiltersArr = [];

          toggleFiltersActive($el, $li, $this);

          $li.each(function(i, val) {
            var $val = $(val);

            if ($val.hasClass(active)) {
              showFiltersArr.push($val.text());
            } else {
              hideFiltersArr.push($val.text());
            }
          });

          // add filters to URL params
          $location.search('filter', hideFiltersArr);
          scope.$apply();

        });



        /*==========  HOVER HANDLER  ==========*/

        var $filterSpan = $('.filter__span');

        $filterSpan.on('mouseover', function() {
          var $this = $(this);
          if ($this.parent('li').hasClass(active)) {
            addFocus($this.parent().text());
          }
        });

        $filterSpan.on('mouseout', function() {
          removeFocus(allFiltersArr);
        });


        /*==========  EVENTS && INIT  ==========*/

        $rootScope.$on('$locationChangeSuccess', function (evt, current, prev) {
          if (UrlUtil.urlParamChanged('filter', current, prev)) {
            hideFiltersArr = $location.search().filter || [];
            showFiltersArr = _.difference(scope.filters, hideFiltersArr);
            filtersInit(hideFiltersArr, showFiltersArr, $li);
          }
        });

        filtersInit(hideFiltersArr, showFiltersArr, $li);

      }, true);

    }

  };
};
