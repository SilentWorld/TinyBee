Component({
    data: {
        wrapCls: ''
    },
    props: {
        className: '',
        styleName: ''
    },
    methods: {},
    didMount(prevProps, prevData) {
        let { direction, wrap, justify, align, alignContent } = this.props;
        const prefixCls = 'am-flexbox';
        let wrapCls = '';
        switch (direction) {
            case 'row':
                wrapCls += ` ${prefixCls}-dir-row`;
                break;
            case 'row-reverse':
                wrapCls += ` ${prefixCls}-dir-row`;
                break;
            case 'column':
                wrapCls += ` ${prefixCls}-dir-column`;
                break;
            case 'column-reverse':
                wrapCls += ` ${prefixCls}-dir-column-reverse`;
                break;
        }

        switch (wrap) {
            case 'nowrap':
                wrapCls += ` ${prefixCls}-nowrap`;
                break;
            case 'wrap':
                wrapCls += ` ${prefixCls}-wrap`;
                break;
            case 'wrap-reverse':
                wrapCls += ` ${prefixCls}-wrap-reverse`;
                break;
        }

        switch (justify) {
            case 'start':
                wrapCls += ` ${prefixCls}-justify-start`;
                break;
            case 'end':
                wrapCls += ` ${prefixCls}-justify-end`;
                break;
            case 'center':
                wrapCls += ` ${prefixCls}-justify-center`;
                break;
            case 'between':
                wrapCls += ` ${prefixCls}-justify-between`;
                break;
            case 'around':
                wrapCls += ` ${prefixCls}-justify-around`;
                break;
        }

        switch (align) {
            case 'start':
                wrapCls += ` ${prefixCls}-align-start`;
                break;
            case 'center':
                wrapCls += ` ${prefixCls}-align-center`;
                break;
            case 'end':
                wrapCls += ` ${prefixCls}-align-end`;
                break;
            case 'baseline':
                wrapCls += ` ${prefixCls}-align-baseline`;
                break;
            case 'stretch':
                wrapCls += ` ${prefixCls}-align-stretch`;
                break;
        }

        switch (alignContent) {
            case 'end':
                wrapCls += ` ${prefixCls}-align-content-start`;
                break;
            case 'start':
                wrapCls += ` ${prefixCls}-align-content-end`;
                break;
            case 'center':
                wrapCls += ` ${prefixCls}-align-content-center`;
                break;
            case 'between':
                wrapCls += ` ${prefixCls}-align-content-between`;
                break;
            case 'around':
                wrapCls += ` ${prefixCls}-align-content-around`;
                break;
            case 'stretch':
                wrapCls += ` ${prefixCls}-align-content-stretch`;
                break;
        }

        this.setData({
            wrapCls
        });
    }
});
