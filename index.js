/**
 * @file   mofron-comp-arwbs/index.js
 * @author simpart
 */
const mf      = require('mofron');
const Text    = require('mofron-comp-text');
const Ddown   = require('mofron-comp-dropdown');
const Slant   = require('mofron-effect-slant');
const Horiz   = require('mofron-layout-horizon');
const evStyle = require('mofron-event-style');

mf.comp.Arwdd = class extends Ddown {
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Arwdd');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @npte private method
     */
    initDomConts () {
        try {
            super.initDomConts();
            
            this.index(
                new mf.Component({
                    layout : [new Horiz()],
                    child  : [this.text(), this.arrow()]
                })
            );
            
            /* add down event */
            let dwn = (dd, flg) => {
                try {
                    let cl_buf = dd.mainColor();
                    /* configure base text */
                    dd.text().execOption({
                        mainColor : (true === flg) ? dd.accentColor() : dd.mainColor()
                    });
                    /* configure arrow */
                    dd.arrow().execOption({
                        mainColor : (true === flg) ? dd.accentColor() : dd.mainColor()
                    });
                    
                    dd.mainColor(cl_buf);  // avoid overwrite
                    dd.arrow().effect('Slant').forcedExec(flg);
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            this.downEvent(dwn);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * arrow component setter/getter
     *
     * @param p1 (Component) arrow component
     * @param p1 (undefined) call as getter
     * @return (Component) arrow component
     */
    arrow (prm) {
        try {
            let ret = this.innerComp('arrow', prm, mf.Component);
            if (undefined !== prm) {
                prm.execOption({
                    style  : [{ 'margin-left' : '0.1rem' }, true],
                    effect : [
                        new Slant({ status : false, value  : [180, 0] })
                    ]
                });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * index text string setter/getter
     *
     * @param p1 (string) index text
     * @param p1 (undefined) call as getter
     * @return (string) index text string
     */
    text (prm) {
        try {
            if ('string' === typeof prm) {
                this.text().execOption({ text : prm });
                return;
            } else if (true === mf.func.isComp(prm, 'Text')) {
                let clr = (btxt, sty, dd) => {
                    try { dd.mainColor(sty.color); } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                prm.execOption({
                    event : [ new evStyle([clr,this], 'color') ]
                });
            }
            return this.innerComp('text', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * index text color setter/getter
     */
    mainColor (prm) {
        try {
            if ( (undefined !== prm) && (null !== prm) ) {
                prm = mf.func.getColor(prm).toString();
            }
            return this.member('mainColor', 'string', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * index text hover color setter/getter
     */
    accentColor (prm) {
        try {
            if ( (undefined !== prm) && (null !== prm) ) {
                prm = mf.func.getColor(prm).toString();
            }
            return this.member('accentColor', 'string', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.Arwdd;
/* end of file */
