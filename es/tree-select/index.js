import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { createNamespace, addUnit } from '../utils';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon';
import Sidebar from '../sidebar';
import SidebarItem from '../sidebar-item'; // Types

var _createNamespace = createNamespace('tree-select'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

function TreeSelect(h, props, slots, ctx) {
  var height = props.height,
      items = props.items,
      mainActiveIndex = props.mainActiveIndex,
      activeId = props.activeId;
  var selectedItem = items[mainActiveIndex] || {};
  var subItems = selectedItem.children || [];
  var isMultiple = Array.isArray(activeId);

  function isActiveItem(id) {
    return isMultiple ? activeId.indexOf(id) !== -1 : activeId === id;
  }

  var Navs = items.filter(function (item) {
    return item.text;
  }).map(function (item) {
    return h(SidebarItem, {
      "attrs": {
        "dot": item.dot,
        "info": item.info,
        "title": item.text,
        "disabled": item.disabled
      },
      "class": bem('nav-item')
    });
  });

  function Content() {
    if (slots.content) {
      return slots.content();
    }

    return subItems.map(function (item) {
      return h("div", {
        "key": item.id,
        "class": ['van-ellipsis', bem('item', {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "on": {
          "click": function click() {
            if (!item.disabled) {
              var newActiveId = item.id;

              if (isMultiple) {
                newActiveId = activeId.slice();
                var index = newActiveId.indexOf(item.id);

                if (index !== -1) {
                  newActiveId.splice(index, 1);
                } else if (newActiveId.length < props.max) {
                  newActiveId.push(item.id);
                }
              }

              emit(ctx, 'click-item', item);
              emit(ctx, 'update:active-id', newActiveId); // compatible for old usage, should be removed in next major version

              emit(ctx, 'itemclick', item);
            }
          }
        }
      }, [item.text, isActiveItem(item.id) && h(Icon, {
        "attrs": {
          "name": "checked",
          "size": "16px"
        },
        "class": bem('selected')
      })]);
    });
  }

  return h("div", _mergeJSXProps([{
    "class": bem(),
    "style": {
      height: addUnit(height)
    }
  }, inherit(ctx)]), [h(Sidebar, {
    "class": bem('nav'),
    "attrs": {
      "activeKey": mainActiveIndex
    },
    "on": {
      "change": function change(index) {
        emit(ctx, 'click-nav', index);
        emit(ctx, 'update:main-active-index', index); // compatible for old usage, should be removed in next major version

        emit(ctx, 'navclick', index);
      }
    }
  }, [Navs]), h("div", {
    "class": bem('content')
  }, [Content()])]);
}

TreeSelect.props = {
  max: {
    type: Number,
    default: Infinity
  },
  items: {
    type: Array,
    default: function _default() {
      return [];
    }
  },
  height: {
    type: [Number, String],
    default: 300
  },
  activeId: {
    type: [Number, String, Array],
    default: 0
  },
  mainActiveIndex: {
    type: Number,
    default: 0
  }
};
export default createComponent(TreeSelect);