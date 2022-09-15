package {thePackage}.{utilsPackage};

import {thePackage}.{utilsPackage}.Messages;

public class FocusonBadRequest400Exception extends RuntimeException {
    public final Messages msgs;
    public FocusonBadRequest400Exception(Messages msgs) {
        super("msgs: " + msgs.toString());
        this.msgs = msgs;
    }
}
