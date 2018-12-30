/**
 * @file   mofron-comp-arwbs/index.js
 * @author simpart
 */
const mf      = require('mofron');
const Text    = require('mofron-comp-text');
const DDBase  = require('mofron-comp-ddbase');
const Slant   = require('mofron-effect-slant');
const Horiz   = require('mofron-layout-horizon');
const evStyle = require('mofron-event-style');

mf.comp.ArwDdb = class extends DDBase {
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('ArwDdb');
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
            
            this.base(
                new mf.Component({
                    layout : [new Horiz()],
                    child  : [this.bsText(), this.arrow()]
                })
            );
            
            /* add down event */
            let dwn = (dd, flg) => {
                try {
                    let cl_buf = dd.mainColor();
                    /* configure base text */
                    dd.bsText().execOption({
                        mainColor : (true === flg) ? dd.accentColor() : dd.mainColor()
                    });
                    /* configure arrow */
                    dd.arrow().execOption({
                        mainColor : (true === flg) ? dd.accentColor() : dd.mainColor()
                    });
                    dd.mainColor(cl_buf);
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
     * base text component setter/getter
     *
     * @param p1 (Text) base text component
     * @param p1 (undefined) call as getter
     * @return  base text component
     * @note private method
     */
    bsText (prm) {
        try {
            if (undefined !== prm) {
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
            return this.innerComp('bsText', prm, Text);
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
     * base text string setter/getter
     *
     * @param p1 (string) base text
     * @param p1 (undefined) call as getter
     * @return (string) base text string
     */
    text (prm) {
        try {
            if (undefined === prm) { 
                return this.bsText().text();
            } else if ('string' === typeof prm) {
                this.bsText().execOption({ text : prm });
            } else if (true === mf.func.isComp(prm, 'Text')) {
                this.bsText(prm);
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm) {
        try { return this.member('mainColor', 'string', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor (prm) {
        try { return this.member('accentColor', 'string', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.ArwDdb;
/* end of file */
