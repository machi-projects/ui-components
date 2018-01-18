"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dependencyFieldsUtils = {

    convertFields: function convertFields(newFieldValues, dependencies, selectedFieldId, selectedFieldValue) {

        var dependencyInfo = dependencies[selectedFieldId]; // Parent-id from child
        if (dependencyInfo) {

            var fieldDependencyInfo = dependencyFieldsUtils.getFieldDependency(dependencies, selectedFieldId, selectedFieldValue);
            if (fieldDependencyInfo) {

                var _newFieldValues = Object.assign({}, fieldValues);
                _newFieldValues[fieldDependencyInfo.childId].allowedValues = fieldDependencyInfo.values;

                return { affectedField: _newFieldValues[fieldDependencyInfo.childId], newFieldValues: _newFieldValues };
            }
        }

        return null;
    },

    getFieldDependency: function getFieldDependency(dependencies, selectedFieldId, selectedFieldValue) {

        var dependencyInfo = dependencies[selectedFieldId]; // Parent-id from child
        if (dependencyInfo) {
            return { childId: dependencyInfo.childId, values: dependencyInfo.mappings[selectedFieldValue] };
        }

        return null;
    },

    convertFormValuesToDependencyField: function convertFormValuesToDependencyField(fieldValues, dependencies) {

        var newFieldValues = Object.assign({}, fieldValues);
        var fieldIds = Object.keys(dependencies);

        for (var i = 0, len = fieldIds.length; i < len; i++) {
            var fieldId = fieldIds[i];
            var parentFieldInfo = newFieldValues[fieldId];
            var dependencyInfo = dependencies[fieldId];

            var fieldDependencyInfo = dependencyFieldsUtils.getFieldDependency(dependencies, fieldId, parentFieldInfo.defaultValue);
            newFieldValues[fieldDependencyInfo.childId].allowedValues = fieldDependencyInfo.values;
        }

        return newFieldValues;
    }

    /**
      dependencies { id : { mappings , parentId(id) , childId  } }
      fields { id : { name , id , label , length , allowedValues...  } }
    
    **/
};exports.default = FormDependencies;