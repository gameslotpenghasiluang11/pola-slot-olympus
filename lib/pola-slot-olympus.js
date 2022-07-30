'use babel';

import PolaSlotOlympusView from './pola-slot-olympus-view';
import { CompositeDisposable } from 'atom';

export default {

  polaSlotOlympusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.polaSlotOlympusView = new PolaSlotOlympusView(state.polaSlotOlympusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.polaSlotOlympusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pola-slot-olympus:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.polaSlotOlympusView.destroy();
  },

  serialize() {
    return {
      polaSlotOlympusViewState: this.polaSlotOlympusView.serialize()
    };
  },

  toggle() {
    console.log('PolaSlotOlympus was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
