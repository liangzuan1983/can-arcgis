import ViewModel from 'can-admin/components/list-table/ViewModel';
import esriPromise from 'esri-promise';
import dev from 'can-util/js/dev/dev';


export default ViewModel.extend('FeatureTable', {
    layerId: 'string',
    view: {
        type: '*', 
        set (view) {
            view.map.layers.watch('length', () => {
                const layer = view.map.findLayerById(this.layerId);
                if (!layer) {
                    dev.warn('feature-table:layer not found');
                    return view;
                }

                view.whenLayerView(layer).then((layerView) => {
                    this.layerView = layerView;
                });
            });

            return view;
        }
    },
    layerView: {
        type: '*',
        set (layerView) {
            layerView.watch('updating', (updating) => {
                if (!updating) {
                    esriPromise(['esri/tasks/support/Query']).then((Query) => {
                        const q = new Query();
                        q.geometry = this.view.extent;
                        layerView.queryFeatures(q).then((result) => {
                            this.objects = result.map((row) => {
                                return row.attributes;
                            });
                        });
                    });
                }
                
            });

            return layerView;
        }
    }
});