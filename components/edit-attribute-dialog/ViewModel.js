import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';
import convertEsriFields from 'can-arcgis/util/convertEsriFields';
import decorateAccessor from 'can-arcgis/util/decorateAccessor';
import pubsub from 'pubsub-js';

const editProps = {
    'update': 'updateFeatures',
    'add': 'addFeatures'
};

export default DefineMap.extend('EditWidget', {
    layerInfos: DefineMap,
    modal: '*',
    editLayer: {},
    editMode: {value: 'update', type: 'string'},
    editGraphic: {
        set (graphic) {
            decorateAccessor(graphic);
            if (graphic.layer) {
                this.editLayer = graphic.layer;
            }
            return graphic;
        }
    },
    editFields: {
        Type: DefineList,
        get (fields) {
            if (fields && fields.length) {
                return fields;
            }
            if (this.editLayer) {
                return convertEsriFields(this.editLayer.fields);
            }
            return [];
        }
    },
    pubsubTopic: {
        type: 'string',
        set (topic) {
            
            if (this.pubsubToken) {
                pubsub.unsubscribe(this.pubsubToken);
                this.pubsubToken = null;
            }

            if (topic) { 
                this.pubsubToken = pubsub.subscribe(topic, this.openDialog.bind(this)); 
            } 
            return topic;
        }
    },
    pubsubToken: '*',
    modalVisible: {
        type: 'boolean',
        value: false,
        set (val) {
            if (this.modal) { 
                setTimeout(() => {
                    this.modal.querySelector('.modal-body').scrollTop = 0; 
                });
            }
            return val;
        }
    },
    isSaving: 'boolean',
    /**
     * Opens the edit dialog with the ViewModel properties passed
     * @param {String} tpc topic name (not used but passed from pubsubjs)
     * @param {Object} props the attributes to assign to the view model
     */
    openDialog (tpc, props) {
        props.modalVisible = true;
        this.assign(props);
    },
    /**
     * 
     * @param {FormViewModel} vm the form viewmodel
     * @param {Element} element form element
     * @param {Event} event The submit event
     * @param {Object} attributes The attributes that have been modified
     * @returns {Promise} a promise object when the apply edits function resolves
     */
    submitForm (vm, element, event, attributes) {
        Object.assign(this.editGraphic.attributes, attributes);
        const propName = editProps[this.editMode];
        const params = {};
        params[propName] = [this.editGraphic];
        return new Promise((resolve, reject) => {
            this.editLayer.applyEdits(params).then(() => {
                this.assign({
                    isSaving: false,
                    modalVisible: false
                });
                resolve();
            }).otherwise((response) => {
                //!steal-remove-start
                //eslint-disable-next-line
                console.warn(response);
                //!steal-remove-end
                reject(response);
            });
        });
    },
    cancelForm () {
        this.assign({
            isSaving: false,
            modalVisible: false
        });
    },
    setModal (element) {
        this.modal = element;
    }
    
});