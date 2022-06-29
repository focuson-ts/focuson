package {thePackage}.{utilsPackage};

import {thePackage}.{utilsPackage}.Messages;

public class FocusonNotFound404Exception extends RuntimeException {
    public final Messages msgs;
    public FocusonNotFound404Exception(Messages msgs) {
        super("msgs: " + msgs.toString());
        this.msgs = msgs;
    }
}
