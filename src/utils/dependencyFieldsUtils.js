const dependencyFieldsUtils =  {

    convertFields : ( newFieldValues , dependencies , selectedFieldId , selectedFieldValue )=>{

        let dependencyInfo = dependencies[ selectedFieldId ];  // Parent-id from child
        if( dependencyInfo ){

            let fieldDependencyInfo = dependencyFieldsUtils.getFieldDependency( dependencies , selectedFieldId , selectedFieldValue );
            if( fieldDependencyInfo ){

              let newFieldValues = Object.assign({}, fieldValues);
              newFieldValues[ fieldDependencyInfo.childId ].allowedValues = fieldDependencyInfo.values;

              return { affectedField : newFieldValues[ fieldDependencyInfo.childId ] , newFieldValues }

            }
       }

       return null;
    },

    getFieldDependency : ( dependencies , selectedFieldId , selectedFieldValue )=>{

        let dependencyInfo = dependencies[ selectedFieldId ];  // Parent-id from child
        if( dependencyInfo ){
            return { childId : dependencyInfo.childId , values : dependencyInfo.mappings[ selectedFieldValue ] }
        }

        return null;
    },

    convertFormValuesToDependencyField : (fieldValues , dependencies)=>{

        let newFieldValues = Object.assign({}, fieldValues);
        let fieldIds = Object.keys(dependencies);

        for(let i=0, len=fieldIds.length; i<len ; i++)
        {
            let fieldId = fieldIds[ i ];
            let parentFieldInfo = newFieldValues[ fieldId ];
            let dependencyInfo = dependencies[ fieldId ];

            let fieldDependencyInfo = dependencyFieldsUtils.getFieldDependency( dependencies , fieldId , parentFieldInfo.defaultValue );
            newFieldValues[ fieldDependencyInfo.childId ].allowedValues = fieldDependencyInfo.values;
        }

        return newFieldValues;

    }

}

/**
  dependencies { id : { mappings , parentId(id) , childId  } }
  fields { id : { name , id , label , length , allowedValues...  } }

**/
export default FormDependencies;
